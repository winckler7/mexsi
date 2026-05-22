  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // Mobile menu (simple toggle)
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '72px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = '#F7F7F7';
    navLinks.style.padding = '1rem 5vw 1.5rem';
    navLinks.style.borderBottom = '2px solid #FF931E';
    navLinks.style.zIndex = '99';
    if (open) navLinks.style.display = 'none';
  });

  // Form submit
  document.querySelector('.form-submit').addEventListener('click', function() {
    this.textContent = '¡Mensaje enviado! ✓';
    this.style.background = '#51A3A3';
    setTimeout(() => {
      this.textContent = 'Enviar mensaje →';
      this.style.background = '';
    }, 3000);
  });


//   // Scroll a #contact desde cualquier página
// window.addEventListener('DOMContentLoaded', () => {
//     if (window.location.hash === '#contact') {
//         // Pequeño delay para que cargue el DOM y las animaciones
//         setTimeout(() => {
//             const target = document.getElementById('contact');
//             if (target) {
//                 target.scrollIntoView({ behavior: 'smooth' });
//             }
//         }, 300);
//     }
// });