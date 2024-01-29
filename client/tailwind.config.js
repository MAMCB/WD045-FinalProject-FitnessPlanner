/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/assets/bodybilder.jpg')",
      },
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      monsterrat: ["Monsterrat", "sans-serif"],
    },
    colors: {
      'primary-color': '#4FB5A9',
      'black-color': '#000',
      'pale-sky':'#6b7280'
    },
  },
  plugins: ["flowbite/plugin"],
};

