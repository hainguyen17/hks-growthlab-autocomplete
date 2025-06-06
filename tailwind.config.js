// tailwind.config.js
const { heroui } = require("@heroui/theme");
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,js,ts,tsx}",
        "./node_modules/@heroui/theme/dist/components/*.js",
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [heroui()],
};
