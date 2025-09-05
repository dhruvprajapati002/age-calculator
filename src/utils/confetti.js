// src/utils/confetti.js
export const createConfetti = () => {
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'fixed inset-0 pointer-events-none z-50';
  confettiContainer.id = 'confetti-container';
  document.body.appendChild(confettiContainer);
  
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.className = 'absolute w-3 h-3 rounded';
    confetti.style.backgroundColor = randomColor;
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDelay = Math.random() * 3 + 's';
    confetti.style.animation = 'confettiFall 3s linear forwards';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiContainer.appendChild(confetti);
  }
  
  setTimeout(() => {
    const container = document.getElementById('confetti-container');
    if (container) {
      document.body.removeChild(container);
    }
  }, 3500);
};
