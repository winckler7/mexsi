/* ============================================================
   i18n.js  –  MEXSI  |  Motor de internacionalización
   - Detecta idioma del browser al primer visit
   - Guarda preferencia en localStorage
   - Toggle manual ES / EN en la navbar
   ============================================================ */

(function () {

  /* ── Detectar idioma ── */
  function detectLang() {
    const stored = localStorage.getItem('mexsi-lang');
    if (stored === 'es' || stored === 'en') return stored;
    const browser = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
    return browser.startsWith('es') ? 'es' : 'en';
  }

  /* ── Aplicar idioma al DOM ── */
  function applyLang(lang) {
    const dict = MEXSI_CONTENT[lang];
    if (!dict) return;

    /* Texto plano */
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    /* HTML (negritas, saltos de línea, etc.) */
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    /* Placeholders de inputs */
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (dict[key] !== undefined) el.placeholder = dict[key];
    });

    /* Atributo lang en <html> para accesibilidad y SEO futuro */
    document.documentElement.lang = lang;

    /* Guardar preferencia */
    localStorage.setItem('mexsi-lang', lang);

    /* Actualizar todos los toggles de la página */
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.textContent = dict['nav.lang'];
      btn.setAttribute('data-current-lang', lang);
    });
  }

  /* ── Toggle al hacer clic ── */
  function bindToggle() {
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const current = btn.getAttribute('data-current-lang') || detectLang();
        applyLang(current === 'es' ? 'en' : 'es');
      });
    });
  }

  /* ── Init ── */
  function init() {
    const lang = detectLang();
    applyLang(lang);
    bindToggle();
  }

  /* Ejecutar cuando el DOM esté listo */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
