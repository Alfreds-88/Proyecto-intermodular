// Sistema de tema oscuro/claro compartido
(function() {
  const THEME_KEY = 'parcha2-theme';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';

  // Cargar tema guardado o usar preferencia del sistema
  function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    // Preferencia del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME;
  }

  // Aplicar tema al documento
  function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === DARK_THEME) {
      html.setAttribute('data-theme', DARK_THEME);
    } else {
      html.setAttribute('data-theme', LIGHT_THEME);
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  // Toggle entre temas
  window.toggleTheme = function() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    applyTheme(newTheme);
    updateThemeButtonIcon();
    // Notificar a otras pestañas (si es posible)
    localStorage.setItem(THEME_KEY, newTheme);
  };

  // Actualizar icono del botón
  window.updateThemeButtonIcon = function() {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    
    const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
    btn.textContent = currentTheme === DARK_THEME ? '☀️' : '🌙';
  };

  // Escuchar cambios de tema en otras pestañas
  window.addEventListener('storage', function(e) {
    if (e.key === THEME_KEY && e.newValue) {
      applyTheme(e.newValue);
      updateThemeButtonIcon();
    }
  });

  // Inicializar tema al cargar
  window.addEventListener('DOMContentLoaded', function() {
    const theme = loadTheme();
    applyTheme(theme);
    updateThemeButtonIcon();
  });

  // Si el script se carga después del DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      const theme = loadTheme();
      applyTheme(theme);
      updateThemeButtonIcon();
    });
  } else {
    const theme = loadTheme();
    applyTheme(theme);
    updateThemeButtonIcon();
  }
})();
