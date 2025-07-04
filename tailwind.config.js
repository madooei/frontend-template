/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add this line to scan the component library:
    "./node_modules/@madooei/shadcn-all-in-one/dist/**/*.{js,cjs}",
    "./node_modules/@madooei/shadcn-theme-presets/dist/**/*.{js,cjs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
