// Runtime path correction for GitHub Pages - runs immediately
(function() {
  console.log("Running path correction for GitHub Pages");

  // Handle paths - use full URL everywhere
  var origin = window.location.origin;
  var base = '/rolandoquintana_pages_svelte';
  var fullBase = origin + base;

  // Force reload with hash if no hash present and not index page
  if (!window.location.hash && window.location.pathname !== base + '/' &&
      window.location.pathname !== base + '/index.html') {
    console.log("Redirecting to hashed URL for SPA routing");
    var newPath = base + '/#' + window.location.pathname.replace(base, '');
    window.location.replace(newPath);
    return;
  }

  // Preload critical modules to avoid dynamic import issues
  function preloadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Manually load the start and app modules
  if (window.location.pathname === base + '/' ||
      window.location.pathname === base + '/index.html' ||
      window.location.pathname.startsWith(base + '/#')) {

    setTimeout(() => {
      console.log("Preloading critical SvelteKit modules");

      const startModule = fullBase + '/_app/immutable/entry/start.DZtUvQbl.js';
      const appModule = fullBase + '/_app/immutable/entry/app.DpuqOob4.js';

      Promise.all([
        preloadScript(startModule),
        preloadScript(appModule)
      ]).then(() => {
        console.log("Critical modules preloaded successfully");
      }).catch(err => {
        console.error("Failed to preload modules:", err);
        document.getElementById('appLoading').innerHTML = `
          <h1>Error Loading Portfolio</h1>
          <p>There was a problem loading the necessary files. Please try refreshing the page.</p>
          <p style="font-size: 0.8rem; margin-top: 1rem;">Technical details: ${err.message}</p>
          <button onclick="window.location.reload()" style="margin-top: 1rem; background: #00FFA3; color: #000; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">Reload Page</button>
        `;
      });
    }, 100);
  }

  // Fix all modulepreload links
  function fixImports() {
    // Fix modulepreload links
    var modulePreloads = document.querySelectorAll('link[rel="modulepreload"]');
    modulePreloads.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('/')) {
        if (!href.startsWith(base)) {
          link.setAttribute('href', base + href);
        }
        // Also add the origin for absolute URLs
        if (!href.startsWith('http')) {
          link.setAttribute('href', origin + link.getAttribute('href'));
        }
      }
    });
  }

  // Run fixImports immediately and after DOM is loaded
  fixImports();
  document.addEventListener('DOMContentLoaded', fixImports);
})();