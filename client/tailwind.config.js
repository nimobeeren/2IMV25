const defaultConfig = require('tailwindcss/defaultConfig')
const formsPlugin = require('@tailwindcss/forms')

module.exports = {
	mode: 'jit',
	purge: ['index.html', 'src/**/*.jsx'],
	theme: {
		fontFamily: {
			sans: ['Inter', defaultConfig.theme.fontFamily.sans]
		}
	},
	experimental: { optimizeUniversalDefaults: true },
	darkMode: 'media',
	plugins: [formsPlugin]
}
