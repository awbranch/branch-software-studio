/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens: {
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1024px',
			'2xl': '1024px',
		},
		extend: {
			colors: {
				wood: {
					100: '#f7f4ed',
					200: '#e5e4e0',
				},
			}
		},
	},
	plugins: [
		require('flowbite/plugin')
	],
}
