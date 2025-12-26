const themes = {
  teal: { accent: '#4fd1c5', accentSoft: 'rgba(79, 209, 197, 0.15)', accentHover: '#3dbfad' },
  purple: { accent: '#a78bfa', accentSoft: 'rgba(167, 139, 250, 0.15)', accentHover: '#8b5cf6' },
  blue: { accent: '#60a5fa', accentSoft: 'rgba(96, 165, 250, 0.15)', accentHover: '#3b82f6' },
  pink: { accent: '#f472b6', accentSoft: 'rgba(244, 114, 182, 0.15)', accentHover: '#ec4899' },
  amber: { accent: '#fbbf24', accentSoft: 'rgba(251, 191, 36, 0.15)', accentHover: '#f59e0b' }
};

function getSavedTheme() {
  return localStorage.getItem('accentTheme') || 'teal';
}

function applyTheme(themeName) {
  const theme = themes[themeName];
  if (theme) {
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--accent-soft', theme.accentSoft);
    document.documentElement.style.setProperty('--accent-hover', theme.accentHover);
    localStorage.setItem('accentTheme', themeName);
    
    // Update active state in menu
    document.querySelectorAll('.color-option').forEach(option => {
      option.classList.toggle('active', option.dataset.theme === themeName);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = getSavedTheme();
  applyTheme(savedTheme);
  
  // Toggle menu
  const themeButton = document.querySelector('.theme-button');
  const themeMenu = document.querySelector('.theme-menu');
  
  if (themeButton && themeMenu) {
    themeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      themeMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', () => {
      themeMenu.classList.remove('active');
    });
    
    // Prevent menu from closing when clicking inside
    themeMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    document.querySelectorAll('.color-option').forEach(option => {
      option.addEventListener('click', () => {
        const themeName = option.dataset.theme;
        applyTheme(themeName);
        themeMenu.classList.remove('active');
      });
    });
  }
});
