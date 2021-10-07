import react from '@vitejs/plugin-react'
import istanbul from 'rollup-plugin-istanbul'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => ({
	plugins: [
		tsconfigPaths(),
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.png', 'robots.txt', 'apple-touch-icon.png'],
			manifest: {
				name: "Quantifying Immersion",
				theme_color: '#374151',
				icons: [
					{
						src: '/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any maskable'
					},
					{
						src: '/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		}),
		mode === 'test' &&
		istanbul({
			include: ['src/**/*.jsx']
		})
	]
}))
