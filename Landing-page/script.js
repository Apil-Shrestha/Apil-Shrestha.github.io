document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll Animations (Fade-in + Slide-up)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% visible
    };

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // animate once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => intersectionObserver.observe(el));

    // 2. Abstract SVG Mouse Movement Reaction
    const heroGraphic = document.querySelector('.hero-graphic');
    const shapePath = document.getElementById('morphing-path');

    if (heroGraphic && shapePath) {
        document.addEventListener('mousemove', (e) => {
            // Get mouse position relative to center of the window (-1 to 1)
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

            // Generate subtle offsets for cubic bezier control points (max offset ~15px)
            const rx = mouseX * 15;
            const ry = mouseY * 15;

            // Updated path string replacing constants with dynamic variables to create a morphing shape effect
            const newPath = `
              M ${200 + rx}, ${50 + ry} 
              C ${300 + rx}, ${50 - ry} ${350 + ry}, ${100 - rx} ${350 - rx}, ${200 - ry} 
              C ${350 - ry}, ${300 + rx} ${300 - rx}, ${350 + ry} ${200 - rx}, ${350 - ry} 
              C ${100 - rx}, ${350 - ry} ${50 + ry}, ${300 - rx} ${50 + rx}, ${200 + ry} 
              C ${50 - ry}, ${100 + rx} ${100 + rx}, ${50 - ry} ${200 + rx}, ${50 + ry} Z
            `;

            shapePath.setAttribute('d', newPath);
        });
    }
});
