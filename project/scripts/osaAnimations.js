// osa facial expressions and animations

// DOM Elements (will be initialized when module is imported)
let osaFace;
let osaMouth;
let osaEyes;

// Initialize the elements when DOM is ready
function initElements() {
  if (!osaFace) {
    osaFace = document.querySelector('.osa-face');
    osaMouth = document.querySelector('.osa-mouth');
    osaEyes = document.querySelectorAll('.osa-eye');
  }
}

// Get osa's face expression
export function getFaceExpression(expression) {
  initElements();
  
  // Reset all expressions first
  osaFace.classList.remove('osa-happy', 'osa-sad', 'osa-talking', 'osa-thinking');
  
  switch (expression) {
    case 'happy':
      osaFace.classList.add('osa-happy');
      playSound('happy');
      break;
    case 'sad':
      osaFace.classList.add('osa-sad');
      playSound('sad');
      break;
    case 'talking':
      osaFace.classList.add('osa-talking');
      playSound('talking');
      break;
    case 'thinking':
      osaFace.classList.add('osa-thinking');
      startThinkingAnimation();
      break;
    case 'neutral':
    default:
      // Just remove all classes
      break;
  }
  
  return expression;
}

// Special animation for thinking
function startThinkingAnimation() {
  initElements();
  
  // Create loading dots animation
  const loadingDots = document.createElement('div');
  loadingDots.classList.add('loading-dots');
  loadingDots.innerHTML = '<span>.</span><span>.</span><span>.</span>';
  
  // Replace mouth with loading animation
  osaMouth.style.display = 'none';
  osaFace.appendChild(loadingDots);
  
  // Remove loading animation after response
  setTimeout(() => {
    osaMouth.style.display = 'block';
    if (loadingDots.parentNode === osaFace) {
      osaFace.removeChild(loadingDots);
    }
  }, 2000); // This is a placeholder - in real use this would be removed when the response arrives
}

// Sound effects (placeholder for now)
function playSound(type) {
  // In a real extension, you would play sounds here
  console.log(`Playing ${type} sound`);
}

// Add CSS for the loading dots animation
function addLoadingDotsStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .loading-dots {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20px;
      margin: 0 auto 20px;
    }
    
    .loading-dots span {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin: 0 3px;
      background-color: #1A7972;
      border-radius: 50%;
      animation: loading 1.4s infinite ease-in-out both;
    }
    
    .loading-dots span:nth-child(1) {
      animation-delay: 0s;
    }
    
    .loading-dots span:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .loading-dots span:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    @keyframes loading {
      0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
      40% { transform: scale(1); opacity: 1; }
    }
  `;
  
  document.head.appendChild(style);
}

// Initialize loading dots style when module is imported
addLoadingDotsStyle();