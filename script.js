// State management
let noClickCount = 0;
const noButtonTexts = [
    "NO 💔",
    "Pretty please 🥺",
    "I'll cry 😭",
    "I'll bring chocolate 🍫",
    "I'll love you forever 💖"
];

// DOM elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionText = document.getElementById('questionText');
const sadOverlay = document.getElementById('sadOverlay');
const celebrationOverlay = document.getElementById('celebrationOverlay');
const heartsContainer = document.getElementById('heartsContainer');
const sparkles = document.getElementById('sparkles');

// Create floating hearts background
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = ['💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// Generate hearts continuously
setInterval(createFloatingHeart, 300);

// Initial hearts
for (let i = 0; i < 15; i++) {
    setTimeout(createFloatingHeart, i * 200);
}

// Anti-gravity effect for NO button
function moveNoButton(e) {
    if (noClickCount >= 4) return; // Don't move if button is about to disappear
    
    const noRect = noBtn.getBoundingClientRect();
    const noCenterX = noRect.left + noRect.width / 2;
    const noCenterY = noRect.top + noRect.height / 2;
    
    let mouseX, mouseY;
    
    // Handle both mouse and touch events
    if (e.type.includes('touch')) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
    } else {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
    
    const deltaX = mouseX - noCenterX;
    const deltaY = mouseY - noCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // If mouse/finger is within 150px of the button, move it away
    if (distance < 150) {
        const angle = Math.atan2(deltaY, deltaX);
        const moveDistance = 150 - distance + 50;
        
        const newX = noCenterX - Math.cos(angle) * moveDistance;
        const newY = noCenterY - Math.sin(angle) * moveDistance;
        
        // Keep button within viewport
        const maxX = window.innerWidth - noRect.width;
        const maxY = window.innerHeight - noRect.height;
        
        const boundedX = Math.max(0, Math.min(newX - noRect.width / 2, maxX));
        const boundedY = Math.max(0, Math.min(newY - noRect.height / 2, maxY));
        
        noBtn.style.left = boundedX + 'px';
        noBtn.style.top = boundedY + 'px';
    }
}

// Add event listeners for anti-gravity effect
document.addEventListener('mousemove', moveNoButton);
document.addEventListener('touchmove', moveNoButton);

// Position NO button initially
function positionNoButton() {
    const containerRect = document.querySelector('.buttons-container').getBoundingClientRect();
    noBtn.style.left = (containerRect.left + containerRect.width / 2 + 100) + 'px';
    noBtn.style.top = containerRect.top + 'px';
}

// Call on load and resize
window.addEventListener('load', positionNoButton);
window.addEventListener('resize', positionNoButton);

// NO button click handler
noBtn.addEventListener('click', () => {
    noClickCount++;
    
    // Show sad overlay
    sadOverlay.classList.add('active');
    
    // Hide sad overlay after 2.5 seconds
    setTimeout(() => {
        sadOverlay.classList.remove('active');
        
        // Update button text or hide button
        if (noClickCount >= 4) {
            noBtn.classList.add('hidden');
            questionText.textContent = "You have only one choice now 😏💞";
        } else {
            noBtn.textContent = noButtonTexts[noClickCount];
        }
    }, 2500);
});

// YES button click handler
yesBtn.addEventListener('click', () => {
    celebrationOverlay.classList.add('active');
    
    // Create celebration hearts
    createCelebrationHearts();
    
    // Create sparkles
    createSparkles();
});

// Create celebration hearts
function createCelebrationHearts() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'sparkle';
            heart.innerHTML = ['💕', '💖', '💗', '💓', '💝', '❤️'][Math.floor(Math.random() * 6)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
            heart.style.animationDelay = Math.random() * 0.5 + 's';
            
            sparkles.appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }, i * 100);
    }
}

// Create sparkles
function createSparkles() {
    const sparkleSymbols = ['✨', '⭐', '🌟', '💫'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.innerHTML = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.fontSize = (Math.random() * 20 + 20) + 'px';
            sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
            sparkle.style.animationDelay = Math.random() * 0.5 + 's';
            
            sparkles.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 5000);
        }, i * 150);
    }
    
    // Keep creating sparkles
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.fontSize = (Math.random() * 20 + 20) + 'px';
        sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        sparkles.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 5000);
    }, 500);
}
