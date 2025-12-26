# Nipun Sharma — Personal Portfolio

A minimal, fluid, and beautiful personal website showcasing my work as a Software Engineer. Built with pure HTML, CSS, and vanilla JavaScript — no frameworks, no build tools, just clean static pages with the help of Claude. 


- **Minimal & Elegant Design** — Dark theme with smooth animations and transitions
- **Configurable Accent Colors** — Choose from 5 color themes (Teal, Purple, Blue, Pink, Amber)
- **Fully Responsive** — Mobile-first design that looks great on all devices
- **Fast & Lightweight** — No dependencies, no build step, pure static files
- **Accessible** — Semantic HTML and keyboard navigation support

## Sections

- **Home** — Introduction, tech stack, and quick links
- **Work** — Professional experience, projects, and core competencies
- **Notes** — Essays and thoughts on software engineering
- **Travel** — Photography, travel stories, and personal reflections


### Deployment

This site is deployed on GitHub Pages. Any push to the `main` branch automatically triggers a deployment.

**Live Site:** [https://nipunsharma12.github.io/nipunsharma/](https://nipunsharma12.github.io/nipunsharma/)

## Structure

```
nipunsharma/
├── index.html          # Homepage
├── work.html           # Professional experience
├── notes.html          # Blog/essays
├── travel.html         # Travel & photography
├── css/
│   ├── base.css        # Reset & typography
│   ├── theme.css       # Colors & theming
│   ├── layout.css      # Layout & components
│   └── theme-switcher.css  # Theme switcher UI
├── js/
│   └── theme-switcher.js   # Theme switching logic
└── assets/
    └── Nipun_Sharma.pdf    # Resume
```

## Customization

### Change Accent Color

Click the 🎨 button in the bottom-right corner to choose from 5 accent colors. Your preference is saved in localStorage.

### Modify Theme Colors

Edit the CSS variables in `css/theme.css`:

```css
:root {
  --accent: #4fd1c5;        /* Primary accent color */
  --accent-soft: rgba(79, 209, 197, 0.15);
  --accent-hover: #3dbfad;
  /* ... other colors */
}
```

### Add New Accent Colors

Edit `js/theme-switcher.js` to add more color options:

```javascript
const themes = {
  yourcolor: { 
    accent: '#hexcode', 
    accentSoft: 'rgba(...)', 
    accentHover: '#hexcode' 
  },
  // ...
};
```

## Tech Stack

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript
- GitHub Pages

## License

© 2025 Nipun Sharma. All rights reserved.

---

**Built with clarity, restraint, and intention.**
