/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
            fontFamily: {
                cormorant: ['var(--font-cormorant)']
            },
        },
	},
	plugins: [],
}
