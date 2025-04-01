import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [sveltekit()],
	base: '/rolandoquintana_pages_svelte/',
	server: {
		fs: {
			// Allow serving files from the project root
			allow: ['..']
		}
	}
});
