/**
 * Page content analyzer that determines if a question relates to the current page
 */

// Constants
const RELEVANCE_THRESHOLD = 0.6; // Threshold to determine if a question is related to the page

/**
 * Analyzes whether a user question is related to the current page content
 * @param {string} question - The user's question
 * @param {Object} pageContent - The content from the current page
 * @returns {boolean} - Whether the question is likely about the current page
 */
export function analyzePageContent(question, pageContent) {
  if (!pageContent || !question) return false;
  
  // Extract keywords from the question
  const keywords = extractKeywords(question);
  
  // Calculate relevance score
  const relevanceScore = calculateRelevance(keywords, pageContent);
  
  return relevanceScore >= RELEVANCE_THRESHOLD;
}

/**
 * Extracts important keywords from a question
 * @param {string} text - The text to extract keywords from
 * @returns {string[]} - Array of keywords
 */
function extractKeywords(text) {
  // Remove question words and common stop words
  const stopWords = [
    'a', 'an', 'the', 'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being',
    'what', 'where', 'when', 'why', 'how', 'who', 'which', 'whom', 'whose',
    'this', 'that', 'these', 'those', 'do', 'does', 'did', 'doing',
    'to', 'for', 'by', 'with', 'about', 'against', 'between', 'into',
    'through', 'during', 'before', 'after', 'above', 'below', 'from',
    'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again',
    'further', 'then', 'once', 'here', 'there', 'all', 'any', 'both',
    'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
    'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can',
    'will', 'just', 'should', 'now'
  ];
  
  // Convert to lowercase and remove punctuation
  const cleanText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
  
  // Split into words and filter out stop words
  const words = cleanText.split(' ').filter(word => 
    word.length > 1 && !stopWords.includes(word)
  );
  
  return words;
}

/**
 * Calculates a relevance score between keywords and page content
 * @param {string[]} keywords - Keywords from the user question
 * @param {Object} pageContent - Content from the current page
 * @returns {number} - Relevance score between 0 and 1
 */
function calculateRelevance(keywords, pageContent) {
  if (keywords.length === 0) return 0;
  
  // Convert page content to a single string and lowercase
  let contentText = '';
  
  if (pageContent.title) {
    contentText += pageContent.title + ' ';
  }
  
  if (pageContent.metaDescription) {
    contentText += pageContent.metaDescription + ' ';
  }
  
  if (pageContent.headings && pageContent.headings.length) {
    contentText += pageContent.headings.join(' ') + ' ';
  }
  
  if (pageContent.mainContent) {
    contentText += pageContent.mainContent + ' ';
  }
  
  contentText = contentText.toLowerCase();
  
  // Count how many keywords are found in the content
  let matchCount = 0;
  
  keywords.forEach(keyword => {
    if (contentText.includes(keyword)) {
      matchCount++;
    }
  });
  
  // Calculate the relevance score
  return matchCount / keywords.length;
}

/**
 * Extracts main content from page elements
 * @param {Document} doc - The document to analyze
 * @returns {string} - Main content as text
 */
export function extractMainContent(doc) {

  return "This is placeholder text for the main content extraction function.";
}