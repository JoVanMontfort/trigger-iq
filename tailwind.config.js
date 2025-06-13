// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
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
      },
    },
  },
  plugins: [],
};
