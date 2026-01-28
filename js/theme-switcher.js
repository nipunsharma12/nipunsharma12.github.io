const themes = {
  teal: { accent: '#4fd1c5', accentSoft: 'rgba(79, 209, 197, 0.15)', accentHover: '#3dbfad', lightAccent: '#2a9d8f', lightAccentSoft: 'rgba(42, 157, 143, 0.12)', lightAccentHover: '#21867a' },
  purple: { accent: '#a78bfa', accentSoft: 'rgba(167, 139, 250, 0.15)', accentHover: '#8b5cf6', lightAccent: '#7c3aed', lightAccentSoft: 'rgba(124, 58, 237, 0.12)', lightAccentHover: '#6d28d9' },
  blue: { accent: '#60a5fa', accentSoft: 'rgba(96, 165, 250, 0.15)', accentHover: '#3b82f6', lightAccent: '#2563eb', lightAccentSoft: 'rgba(37, 99, 235, 0.12)', lightAccentHover: '#1d4ed8' },
  pink: { accent: '#f472b6', accentSoft: 'rgba(244, 114, 182, 0.15)', accentHover: '#ec4899', lightAccent: '#db2777', lightAccentSoft: 'rgba(219, 39, 119, 0.12)', lightAccentHover: '#be185d' },
  amber: { accent: '#fbbf24', accentSoft: 'rgba(251, 191, 36, 0.15)', accentHover: '#f59e0b', lightAccent: '#d97706', lightAccentSoft: 'rgba(217, 119, 6, 0.12)', lightAccentHover: '#b45309' }
};

function getSavedTheme() {
  return localStorage.getItem('accentTheme') || 'teal';
}

function getSavedMode() {
  return localStorage.getItem('colorMode') || 'dark';
}

function applyTheme(themeName) {
  const theme = themes[themeName];
  const mode = getSavedMode();
  if (theme) {
    if (mode === 'light') {
      document.documentElement.style.setProperty('--accent', theme.lightAccent);
      document.documentElement.style.setProperty('--accent-soft', theme.lightAccentSoft);
      document.documentElement.style.setProperty('--accent-hover', theme.lightAccentHover);
    } else {
      document.documentElement.style.setProperty('--accent', theme.accent);
      document.documentElement.style.setProperty('--accent-soft', theme.accentSoft);
      document.documentElement.style.setProperty('--accent-hover', theme.accentHover);
    }
    localStorage.setItem('accentTheme', themeName);
    
    // Update active state in menu
    document.querySelectorAll('.color-option').forEach(option => {
      option.classList.toggle('active', option.dataset.theme === themeName);
    });
  }
}

function applyMode(mode) {
  if (mode === 'light') {
    document.documentElement.setAttribute('data-mode', 'light');
  } else {
    document.documentElement.removeAttribute('data-mode');
  }
  localStorage.setItem('colorMode', mode);
  
  // Update toggle icons
  const sunIcon = document.querySelector('.mode-toggle-icon.sun');
  const moonIcon = document.querySelector('.mode-toggle-icon.moon');
  if (sunIcon && moonIcon) {
    sunIcon.classList.toggle('active', mode === 'light');
    moonIcon.classList.toggle('active', mode === 'dark');
  }
  
  // Re-apply theme colors for the mode
  applyTheme(getSavedTheme());
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = getSavedTheme();
  const savedMode = getSavedMode();
  
  applyMode(savedMode);
  applyTheme(savedTheme);
  
  // Mode toggle
  const modeToggle = document.querySelector('.mode-toggle');
  if (modeToggle) {
    modeToggle.addEventListener('click', () => {
      const currentMode = getSavedMode();
      applyMode(currentMode === 'dark' ? 'light' : 'dark');
    });
  }
  
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
