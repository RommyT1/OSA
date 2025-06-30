const DEMO_MODE = false;

// Maintain ongoing chat history
const messageHistory = [];

/**
 * Sends a message to GPT and gets a response
 * @param {string} message - User's message
 * @param {Object|null} pageContent - Content of the current page
 * @returns {Promise<string>} - GPT's response
 */
export async function sendMessageToGPT(message, pageContent) {
  if (DEMO_MODE) {
    return simulateResponse(message, pageContent);
  }

  try {
    // Inject system context once
    if (
      pageContent &&
      !messageHistory.find(m => m.role === 'system' && m.content.includes('Main page content'))
    ) {
      const systemMessage = {
        role: 'system',
        content: `You are OSA, a helpful assistant.

Assume the user is referring to the current product page they are browsing unless they clearly ask about something else.

The product page is titled: "${pageContent.title}".

Main page content:
${pageContent.mainContent}

Use this information to answer their questions.`
      };

      messageHistory.unshift(systemMessage);
      console.log("✅ Injected page context:", systemMessage.content);
    }

    // Add user message to chat history
    messageHistory.push({ role: 'user', content: message });

    // Log full message history being sent
    console.log("📤 Sending messageHistory to GPT:", JSON.stringify(messageHistory, null, 2));

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer #KEY // Replace this with your key
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messageHistory,
        max_tokens: 300
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ OpenAI API error:", data);
      if (data.error && data.error.message) {
        return `Error: ${data.error.message}`;
      }
      return "Something went wrong. Try again in a bit!";
    }

    const responseText = data.choices?.[0]?.message?.content || "OSA didn't get a proper reply. Please try again!";
    console.log("🤖 GPT Response:", responseText);

    // Add assistant reply to history
    messageHistory.push({ role: 'assistant', content: responseText });

    return responseText;
  } catch (error) {
    console.error('⚠️ Error communicating with AI service:', error);
    return "Oh no! OSA's circuits got scrambled. Can you try again?";
  }
}

// Optional fallback demo mode
function simulateResponse(message, pageContent) {
  return "(Simulated response) OSA is thinking...";
}
