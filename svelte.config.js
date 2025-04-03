import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		paths: {
			base: ''  // Use empty string for custom domain
		},
		appDir: 'app',
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore static asset 404s since they'll be available after build
				if (path.startsWith('/static/')) {
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;
