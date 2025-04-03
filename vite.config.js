import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const dev = process.env.NODE_ENV !== 'production';

export default defineConfig({
	plugins: [sveltekit()],
	base: '/',
	server: {
		fs: {
			// Allow serving files from one level up the project root
			allow: ['..']
		}
	}
});