// This configuration file sets up Tailwind CSS for a Vue.js project, specifying where to look for class names and extending the default theme if needed.   
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
}
