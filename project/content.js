/**
 * Content script that runs in the context of web pages
 * This script analyzes the current page and communicates with the popup
 */

// Store extracted content
let pageContent = null;

// Extract content from the current page
function extractPageContent() {
  if (pageContent) return pageContent;

  // Extract basic page information
  const title = document.title;
  const metaDescription = document.querySelector('meta[name="description"]')?.content || '';

  // Extract headings
  const headings = [];
  document.querySelectorAll('h1, h2, h3').forEach(heading => {
    headings.push(heading.textContent.trim());
  });

  // Extract main content
  const mainContent = [];

  // Key content areas
  const contentSelectors = [
    'main',
    'article',
    '[role="main"]',
    '#content',
    '.content',
    '.main-content',
    '#centerCol', // for Amazon
    '.product',   // general e-commerce
  ];

  for (const selector of contentSelectors) {
    document.querySelectorAll(selector).forEach(element => {
      const text = element.textContent.trim();
      if (text.length > 30) {
        mainContent.push(text);
      }
    });
  }

  // Extract list items
  document.querySelectorAll('ul li, ol li').forEach(item => {
    const text = item.textContent.trim();
    if (text.length > 30 && !mainContent.includes(text)) {
      mainContent.push(text);
    }
  });

  // Extract product tables
  document.querySelectorAll('table').forEach(table => {
    const tableText = table.innerText.trim();
    if (tableText.length > 30) {
      mainContent.push(tableText);
    }
  });

  // Fallback: paragraphs
  if (mainContent.length === 0) {
    document.querySelectorAll('p').forEach(p => {
      const text = p.textContent.trim();
      if (text.length > 50) {
        mainContent.push(text);
      }
    });
  }

  // Store the extracted content
  pageContent = {
    title,
    metaDescription,
    headings,
    mainContent: mainContent.join('\n').substring(0, 12000), // slightly longer cap
    url: window.location.href,
    timestamp: new Date().toISOString()
  };

  console.log("✅ Extracted content:", pageContent);
  return pageContent;
}

// Handle popup request
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    try {
      const content = extractPageContent();
      sendResponse({ success: true, content });
    } catch (error) {
      console.error('❌ Error extracting page content:', error);
      sendResponse({ success: false, error: error.message });
    }
    return true; // keep channel open for async
  }
});

// Wait for price or key content before extracting
function waitForAmazonContentAndExtract() {
  const checkInterval = setInterval(() => {
    const priceReady =
      document.querySelector('#corePriceDisplay_desktop_feature_div span.a-offscreen') ||
      document.querySelector('#priceblock_ourprice') ||
      document.querySelector('.a-price span.a-offscreen');

    if (priceReady) {
      clearInterval(checkInterval);
      extractPageContent();
    }
  }, 500);

  // Fallback force extract after 5 seconds
  setTimeout(() => {
    clearInterval(checkInterval);
    extractPageContent();
  }, 5000);
}

// Run content extraction logic
waitForAmazonContentAndExtract();

console.log('✅ OSA Content Script loaded and monitoring page...');
