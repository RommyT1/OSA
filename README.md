# 🧠 osa – ChatGPT Assistant Chrome Extension

A delightful Chrome extension that brings **osa**, inspired by Adventure Time, to life as your personal AI assistant! osa can analyze the content of your current webpage and answer questions about it — or provide intelligent responses using the power of ChatGPT.

⚠️ NOTE: To enable AI functionality, you must provide your own OpenAI API key. This key is not included in the codebase for security reasons. See the "AI Integration" section below.

---

## Features

- 🤖 osa-themed interface with expressive animated reactions
- 💬 Chat with osa directly from your browser
- 📄 Answers questions about the current page's content
- 🌐 Falls back to general knowledge if question is unrelated to the page
- 🎨 Fun, interactive design inspired by Adventure Time

---

## Installation (Development Mode)

1. Clone or download this repository to your local machine
2. Open Google Chrome and navigate to chrome://extensions/
3. Enable "Developer mode" (top-right corner toggle)
4. Click "Load unpacked" and select the extension folder
5. The osa icon will appear in your toolbar

---

## Usage

1. Click the osa icon in the toolbar
2. Ask a question in the chat box
3. osa will:
   - Use the current page's content if your question is about the page
   - Otherwise, use external AI knowledge (and let you know)
4. Enjoy chatting with osa!

---

## Project Structure

osa/

├── manifest.json              # Chrome extension configuration

├── popup.html                 # Main UI

├── styles/

│   └── popup.css              # Styles for the popup UI

├── scripts/

│   ├── popup.js               # Popup logic

│   ├── osaAnimations.js       # Facial animations for osa

│   ├── pageAnalyzer.js        # Analyzes page content

│   ├── chatService.js         # ChatGPT API interaction

│   └── content.js             # Injected script to access webpage content

└── assets/

  └── icons/                 # Extension icons

---

## AI Integration

To enable AI functionality:

1. Get an OpenAI API key at https://platform.openai.com/account/api-keys
2. Open `scripts/chatService.js`
3. Go to **line 51** and replace the placeholder with your API key:
   const apiKey = "sk-..."; // <- your OpenAI API key here

IMPORTANT: The key is not included in this repo for confidentiality. You must provide your own to use osa's AI features.

DO NOT commit your key to version control.

---

## Credits

- Created for fun
- Inspired by bmo, the lovable character

---

## Disclaimer

This extension is for educational and personal use only. API usage may incur charges. Keep your API key private and monitor usage on your OpenAI account.
