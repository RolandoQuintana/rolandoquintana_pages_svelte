// This script handles loading the SvelteKit modules properly
(function() {
  console.log("Initializing SvelteKit loader");
  var origin = window.location.origin;
  var base = '/rolandoquintana_pages_svelte';
  var fullBase = origin + base;

  // Function to load a module script directly
  function loadModule(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = url;
      script.onload = () => resolve();
      script.onerror = (e) => {
        console.error(`Failed to load module: ${url}`, e);
        reject(new Error(`Failed to load module: ${url}`));
      };
      document.head.appendChild(script);
    });
  }

  // Load critical chunks first
  const criticalChunks = [
    '/_app/immutable/chunks/W7dolCZE.js',
    '/_app/immutable/chunks/BEXfOjdy.js',
    '/_app/immutable/chunks/BpCh3IZ6.js',
    '/_app/immutable/chunks/FMboxBTo.js',
    '/_app/immutable/chunks/CiqtYpDN.js',
    '/_app/immutable/chunks/G9bYwqTl.js'
  ];

  // Then load the entry points
  const entryModules = [
    '/_app/immutable/entry/start.DZtUvQbl.js',
    '/_app/immutable/entry/app.DpuqOob4.js'
  ];

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, loading critical SvelteKit modules");

    // Set a flag when initialization is complete
    window.__sveltekit_initialized = false;

    // Create a global function for the modules to call
    window.__sveltekit_1n1drg1 = {
      base: base,
      assets: base
    };

    // Load chunks first, then entry points
    Promise.all(criticalChunks.map(chunk => loadModule(fullBase + chunk)))
      .then(() => {
        console.log("Critical chunks loaded, loading entry modules");
        return Promise.all(entryModules.map(module => loadModule(fullBase + module)));
      })
      .then(() => {
        console.log("All modules loaded successfully");
        // Set initialization flag
        window.__sveltekit_initialized = true;
      })
      .catch(error => {
        console.error("Failed to load modules:", error);
        document.getElementById('appLoading').innerHTML = `
          <h1>Error Loading Portfolio</h1>
          <p>There was a problem loading the necessary files.</p>
          <p style="font-size: 0.8rem; margin-top: 1rem;">Technical details: ${error.message}</p>
          <button onclick="window.location.reload()" style="margin-top: 1rem; background: #00FFA3; color: #000; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">Reload Page</button>
          <p style="font-size: 0.8rem; margin-top: 1rem;"><a href="https://github.com/RolandoQuintana/rolandoquintana_pages_svelte" style="color: #00FFA3;">View on GitHub</a></p>
        `;
      });
  });
})();