/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
        "node_modules/flowbite-react/lib/esm/**/*.js",
    ],

    theme: {
        extend: {
            colors: {
                primary: "#ff4800",
            },
            
        },
    },
    plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};

