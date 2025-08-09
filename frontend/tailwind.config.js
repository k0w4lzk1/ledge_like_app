import tailwindcss from '@tailwindcss/postcss'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom background colors
        'app-bg': '#f1f6f7',      // Main background color
        'sidebar-bg': '#f8fafb',   // Sidebar background color
        'card-bg': '#d0d5dd',      // Card background color
        
        // You can add more custom colors here as needed
        'custom': {
          'light-blue': '#f1f6f7',
          'light-gray': '#f8fafb',
          'card-gray': '#d0d5dd',
        }
      },
    },
  },
  plugins: [],
}
