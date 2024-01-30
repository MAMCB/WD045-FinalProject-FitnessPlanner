/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  plugins: ["flowbite/plugin"],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '100%',
          md: '1024px',
          lg: '1200px', // Custom container width
          xl: '1400px', // Custom container width
        },
      },
      colors: {
        background: "#F8FCFB",
        primaryOne: "#4FB5A9",
        secondary: "##9eb9d6",
        primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a", "950": "#172554" },
        accent: "##7389c4",
        'primary-color': '#4FB5A9',
        'black-color': '#000',
        'pale-sky': '#6b7280'
      },
    },
    fontFamily: {
      body: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      roboto: ["Roboto", "sans-serif"],
      monsterrat: ["Monsterrat", "sans-serif"],

    
    },
    backgroundImage: {
      'hero-pattern': "url('/src/assets/bodybilder.jpg')",
    },
    
  },
    
};

