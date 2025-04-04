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
      document.documentElement.dataset.deployed = 'true';

      // Fix paths for all scripts and links with wrong paths
      const fixPaths = () => {
        // Find all assets with absolute URLs and make them relative if needed
        document.querySelectorAll('link[href^="/app/"], script[src^="/app/"]').forEach(el => {
          const attr = el.hasAttribute('href') ? 'href' : 'src';
          const value = el.getAttribute(attr);
          if (value && value.startsWith('/app/')) {
            // Remove leading slash for relative paths
            el.setAttribute(attr, value.substring(1));
            console.log('Fixed path:', value, 'to', value.substring(1));
          }
        });
      };

      // Run path fixing logic after a short delay
      setTimeout(fixPaths, 100);

      // Also run it when DOM changes
      const observer = new MutationObserver(fixPaths);
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
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