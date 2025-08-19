(function() {
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;


const els = [].slice.call(document.querySelectorAll('[data-animate]'));
if (!('IntersectionObserver' in window) || els.length === 0) {
els.forEach(el => el.classList.add('is-inview'));
return;
}


const obs = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const el = entry.target;
el.classList.add('is-inview');
observer.unobserve(el); // animuj tylko raz
}
});
}, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });


els.forEach(el => {
// Stagger dla kontenerów: [data-stagger] => animuje dzieci kolejno
if (el.hasAttribute('data-stagger')) {
const children = el.querySelectorAll(':scope > *');
children.forEach((child, i) => {
child.style.transitionDelay = (100 + i * 80) + 'ms';
child.setAttribute('data-animate', child.getAttribute('data-animate') || 'up');
obs.observe(child);
});
} else {
obs.observe(el);
}
});
})();
