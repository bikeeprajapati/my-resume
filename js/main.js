/* ==========================================================================
   Bikee Prajapati — Portfolio Scripts
   - Footer year
   - Scroll-triggered reveal animations (IntersectionObserver)
   - Ambient cursor glow (desktop, pointer-fine only)
   Respects prefers-reduced-motion throughout.
   ========================================================================== */

document.getElementById('year').textContent = new Date().getFullYear();

// Scroll-triggered reveals
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
if (reduceMotion) {
    revealEls.forEach(el => el.classList.add('in'));
} else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('in'));
}

// Ambient cursor glow (desktop only, respects reduced motion)
if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const glow = document.getElementById('glow');
    let raf = null;
    window.addEventListener('mousemove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        raf = null;
      });
    });
}