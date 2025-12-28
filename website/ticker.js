document.addEventListener('DOMContentLoaded', () => {
  try {
    const tickerContent = document.querySelector('.ticker-content');
    const tickerItems = document.querySelectorAll('.ticker-item');
    
    if (!tickerContent || tickerItems.length === 0) return;

    // Clone items for seamless infinite scroll
    tickerItems.forEach(item => {
      const clone = item.cloneNode(true);
      tickerContent.appendChild(clone);
    });

    // Add click interaction to ticker items
    document.querySelectorAll('.ticker-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const text = item.textContent.trim();
        
        // Add visual feedback
        item.classList.add('clicked');
        setTimeout(() => item.classList.remove('clicked'), 300);
        
        // Show notification
        showTickerNotification(text);
      });

      // Tooltip on hover for mobile
      item.addEventListener('touchstart', () => {
        item.style.backgroundColor = 'rgba(255,255,255,0.2)';
      });

      item.addEventListener('touchend', () => {
        item.style.backgroundColor = '';
      });
    });

    // Function to show notification
    function showTickerNotification(message) {
      const notification = document.createElement('div');
      notification.className = 'ticker-notification';
      notification.textContent = message;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.classList.add('show');
      }, 10);

      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }, 4000);
    }

    // Add touch-swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const container = document.querySelector('.ticker-container');

    if (container) {
      container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, false);

      container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, false);

      function handleSwipe() {
        const diff = touchEndX - touchStartX;
        // Pause animation briefly on swipe
        if (Math.abs(diff) > 50) {
          tickerContent.style.animationPlayState = 'paused';
          setTimeout(() => {
            tickerContent.style.animationPlayState = 'running';
          }, 500);
        }
      }
    }

  } catch (e) {
    console.error('ticker.js error:', e);
  }
});

// CSS for ticker notification
const style = document.createElement('style');
style.textContent = `
  .ticker-notification {
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%) translateY(-20px);
    background: linear-gradient(135deg, #0b63b7, #063a73);
    color: white;
    padding: 14px 20px;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(6, 58, 115, 0.3);
    font-weight: 600;
    font-size: 0.95rem;
    z-index: 1000;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
    pointer-events: none;
    border-left: 4px solid #0f4fb0;
  }

  .ticker-notification.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .ticker-item.clicked {
    transform: scale(0.95);
  }
`;
document.head.appendChild(style);
