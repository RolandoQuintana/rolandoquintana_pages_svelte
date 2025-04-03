import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.env.NODE_ENV !== 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapters
		adapter: adapter({
			// default options are shown
			pages: 'docs',
			assets: 'docs',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		paths: {
			// Use empty base path for development, and the GitHub Pages path for production
			base: dev ? '' : '/rolandoquintana_pages_svelte'
		},
		prerender: {
			handleMissingId: 'ignore'
		}
	}
};

export default config;
