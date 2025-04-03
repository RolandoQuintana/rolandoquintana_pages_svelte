<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import '../app.css';

  export let data;

  // Fix for GitHub Pages and custom domains
  onMount(() => {
    if (browser) {
      // Check if we need to fix paths for assets
      const links = document.querySelectorAll('link[href^="/app/"], script[src^="/app/"]');
      links.forEach(el => {
        const attr = el.hasAttribute('href') ? 'href' : 'src';
        const value = el.getAttribute(attr);
        if (value && value.startsWith('/app/')) {
          // Remove leading slash for relative paths
          el.setAttribute(attr, value.substring(1));
        }
      });

      // Also immediately apply this fix to any dynamic imports using type assertion
      const windowAny = window as any;
      if (windowAny.__sveltekit_122rurj) {
        windowAny.__sveltekit_122rurj.base = '';
      }
    }
  });
</script>

<svelte:head>
  <!-- Base path to ensure all resources load correctly -->
  <base href="{base}/" />
</svelte:head>

<div class="flex flex-col min-h-screen">
  <main class="flex-1">
    <slot />
  </main>
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>