/** @type {import('tailwindcss').Config} */
export default {
	content: [
    './src/**/*.vue',
  ],
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '1024px',
			xl: '1440px',
		},
		extend: {
			colors: {
				'custom-blue': '#243c5a',
			},
		},
	},
	plugins: [],
};
