document.addEventListener('DOMContentLoaded', () => {
  try {
    const current = (decodeURIComponent(location.pathname.split('/').pop() || 'web1.html')||'').split(/[?#]/)[0].toLowerCase();
    const links = document.querySelectorAll('.meny a');
    const header = document.querySelector('.krye');
    const menu = document.querySelector('.meny');

    // Set active link based on current page
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      const target = (href.split('/').pop()||'').split(/[?#]/)[0].toLowerCase();
      if (target === current || (current === '' && (target === 'web1.html' || target === 'index.html'))) {
        a.classList.add('aktual');
      } else {
        a.classList.remove('aktual');
      }

      a.addEventListener('click', () => {
        links.forEach(l => l.classList.remove('aktual'));
        a.classList.add('aktual');
        const menu = document.querySelector('.meny');
        if (menu && menu.classList.contains('open')) {
          // Add ripple effect before closing
          a.style.transform = 'scale(0.95)';
          setTimeout(() => {
            a.style.transform = '';
          }, 150);
          
          setTimeout(() => {
            menu.classList.remove('open');
            document.body.classList.remove('menu-open');
            const toggle = document.querySelector('.menu-toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
          }, 100);
        }
      });

      // Add touch feedback for mobile
      a.addEventListener('touchstart', function() {
        this.style.background = 'rgba(255,255,255,0.15)';
      });
      a.addEventListener('touchend', function() {
        this.style.background = '';
      });
    });

    // Create and setup mobile menu toggle button
    if (header && menu) {
      if (!document.querySelector('.menu-toggle')) {
        const btn = document.createElement('button');
        btn.className = 'menu-toggle';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Hap/Close meny');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<span aria-hidden="true">☰</span>';
        header.appendChild(btn);
        
        btn.addEventListener('click', () => {
          const isOpen = menu.classList.toggle('open');
          document.body.classList.toggle('menu-open', isOpen);
          btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          
          // Add visual feedback
          btn.style.background = isOpen ? 'rgba(255,255,255,0.15)' : 'transparent';
          setTimeout(() => {
            if (!isOpen) btn.style.background = '';
          }, 200);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
          if (!header.contains(e.target) && menu.classList.contains('open')) {
            menu.classList.remove('open');
            document.body.classList.remove('menu-open');
            btn.setAttribute('aria-expanded', 'false');
            btn.style.background = '';
          }
        });
      }
    }

    // Handle scroll effect on header
    const onScroll = () => {
      const hdr = document.querySelector('.krye');
      if (!hdr) return;
      if (window.scrollY > 12) hdr.classList.add('scrolled'); else hdr.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll);
    onScroll();

  } catch (e) {
    console.error('nav.js error', e);
  }
});