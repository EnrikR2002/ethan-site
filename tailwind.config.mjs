/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    ],
    theme: {
        extend: {
            container: { center: true, padding: '1rem' },
            colors: {
                brand: {
                    50: '#f5f7ff', 100: '#eaeefe', 200: '#d5dbfd', 300: '#b3bdfc',
                    400: '#8b96f9', 500: '#6470f6', 600: '#4450e8', 700: '#3842c0',
                    800: '#2f389b', 900: '#2b3380', 950: '#1a1e4e'
                }
            }
        }
    },
    plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}