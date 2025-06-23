// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        orbitron: ['Orbitron', 'sans-serif'],
        michroma: ['Michroma', 'sans-serif'],
        exo: ['"Exo 2"', 'sans-serif'],
      },
      colors: {
        // Existing palette
        slate: {
          900: '#0f172a',
          800: '#1e293b',
          50: '#f8fafc',
        },
        blue: {
          600: '#2563eb',
          700: '#1d4ed8',
        },
        orange: {
          400: '#fb923c',
        },
        teal: {
          400: '#2dd4bf',
        },

        // Added neon/futuristic theme
        space: '#0B0B28',
        neonBlue: '#00FFFF',
        neonPink: '#FF00FF',
        pulsePurple: '#8B5CF6',
      },
      dropShadow: {
        neon: '0 0 10px #00FFFF',
      },
    },
  },
  plugins: [],
};
