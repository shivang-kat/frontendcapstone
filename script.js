
document.getElementById('enterButton').addEventListener('click', function() {
    const container = document.querySelector('.main-container');
    const title = document.getElementById('title');

    container.classList.add('zoomed-in');
    title.style.opacity = '0';

    setTimeout(() => {
        window.location.href = 'homepage.html'; // Update with your homepage URL
    }, 1000); // Match duration of CSS transition
});
document.addEventListener('DOMContentLoaded', function() {
    const bubbleContainer = document.getElementById('bubble-container');

    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        const size = Math.random() * 60 + 10; // Random size between 10px and 70px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        bubble.style.left = `${Math.random() * 100}%`; // Random horizontal position
        bubble.style.bottom = `-${size}px`; // Start from below the screen

        const animationDuration = Math.random() * 10 + 5; // Random duration between 5 and 15 seconds
        bubble.style.animation = `floatBubble ${animationDuration}s linear infinite`;

        bubbleContainer.appendChild(bubble);

        // Remove the bubble after its animation ends
        setTimeout(() => {
            bubble.remove();
        }, animationDuration * 1000);
    }

    // Create bubbles at intervals
    setInterval(createBubble, 300); // Adjust interval for more/less frequent bubbles
});

// CSS Keyframes in JavaScript
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes floatBubble {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-100vh);
        }
    }
`;
document.head.appendChild(styleSheet);

async function submitUserFeedback() {
    // ... existing code ...

    // Show the feedback popup
    document.getElementById('feedbackPopup').style.display = 'block';
}

