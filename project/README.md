# osa ChatGPT Assistant Chrome Extension

A delightful Chrome extension that brings osa from Adventure Time to life as your personal AI assistant. osa can analyze the content of your current webpage and answer questions about it, or provide information from its knowledge base.

## Features

- 🤖 osa-themed interface with animated facial expressions
- 💬 Chat interface with osa, where you can ask questions
- 📄 Page content analysis to answer questions about the current page
- 🔄 Clear indication when using external knowledge vs. page information
- 🎮 Fun, interactive design inspired by Adventure Time

## Installation (Development Mode)

1. Clone this repository to your local machine
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top-right corner
4. Click "Load unpacked" and select the directory containing this extension
5. The osa extension icon should now appear in your browser toolbar

## Usage

1. Click the osa icon in your browser toolbar to open the popup
2. Type a question in the input field at the bottom
3. osa will analyze if your question is related to the current page:
   - If it is, osa will use the page content to answer
   - If not, osa will use external knowledge (and indicate this)
4. Enjoy interacting with osa!

## Development Notes

### Project Structure

- `manifest.json`: Chrome extension configuration file
- `popup.html`: The main popup UI
- `styles/popup.css`: Styling for the popup
- `scripts/`: JavaScript modules
  - `popup.js`: Main popup functionality
  - `osaAnimations.js`: Controls osa's facial expressions
  - `pageAnalyzer.js`: Analyzes webpage content
  - `chatService.js`: Handles chat functionality with AI
- `content.js`: Content script for accessing webpage data
- `assets/icons/`: Extension icons

### AI Integration

This extension includes a simulated ChatGPT integration for demonstration purposes. To connect to an actual AI API:

1. Get an API key from your preferred AI service
2. Update the `sendMessageToGPT` function in `chatService.js`
3. Implement proper error handling and rate limiting

## Credits

- Created as a fun project for Adventure Time fans
- Inspired by osa, the lovable character from Adventure Time
- This is a fan project and not officially affiliated with Adventure Time, Cartoon Network, or OpenAI