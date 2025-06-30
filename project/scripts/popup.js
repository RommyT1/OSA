// Import other modules
import { getFaceExpression } from './osaAnimations.js';
import { sendMessageToGPT } from './chatService.js';

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const closeButton = document.getElementById('closeButton'); // Red close button
const osaFace = document.querySelector('.osa-face');

// State
let pageContent = null;
let isProcessing = false;

// Initialize the popup
async function initPopup() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]) {
      const response = await chrome.tabs.sendMessage(tabs[0].id, { action: 'getPageContent' });
      if (response && response.success && response.content) {
        pageContent = response.content;
        console.log("✅ Page content loaded:", pageContent);
      }
    }

  addMessage("Hello! I'm OSA. How can I help you today?", 'osa');

  } catch (error) {
    console.error('Error initializing popup:', error);
    addMessage('osa is having trouble connecting to this page. Let me know if I can help with something else!', 'osa');
  }

  // Welcome animation
  setTimeout(() => {
    getFaceExpression('happy');
    setTimeout(() => getFaceExpression('neutral'), 2000);
  }, 500);
}

// Add message to chat
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender === 'user' ? 'from-user' : 'from-osa');

  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  messageDiv.appendChild(paragraph);

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle user message
async function processUserMessage(message) {
  if (!message.trim() || isProcessing) return;

  isProcessing = true;
  chatInput.value = '';

  addMessage(message, 'user');
  getFaceExpression('thinking');

  try {
    const response = await sendMessageToGPT(message, pageContent);
    getFaceExpression('talking');
    addMessage(response, 'osa');
    setTimeout(() => getFaceExpression('neutral'), 1000);
  } catch (error) {
    console.error('Error processing message:', error);
    addMessage('Oops! OSA had a glitch. Please try again.', 'osa');
    getFaceExpression('sad');
    setTimeout(() => getFaceExpression('neutral'), 2000);
  }

  isProcessing = false;
}

// Event Listeners
sendButton.addEventListener('click', () => {
  processUserMessage(chatInput.value);
});

chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    processUserMessage(chatInput.value);
  }
});

chatInput.addEventListener('input', (e) => {
  const text = e.target.value.toLowerCase();
  if (text.includes('smile') || text.includes('happy')) {
    getFaceExpression('happy');
  } else if (text.includes('sad') || text.includes('unhappy')) {
    getFaceExpression('sad');
  } else if (text.length > 0) {
    getFaceExpression('neutral');
  }
});

// 👇 Red button close logic
closeButton?.addEventListener('click', () => {
  window.close();
});

// Initialize
document.addEventListener('DOMContentLoaded', initPopup);
