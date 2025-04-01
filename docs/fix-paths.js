// Runtime path correction for GitHub Pages - runs immediately
(function() {
  console.log("Running path correction for GitHub Pages");
  var base = '/rolandoquintana_pages_svelte';

  // Ensure all imports have the correct base path
  function fixImports() {
    // Fix modulepreload links
    var modulePreloads = document.querySelectorAll('link[rel="modulepreload"]');
    modulePreloads.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith(base)) {
        link.setAttribute('href', base + href);
        console.log('Fixed modulepreload link:', href, 'to', base + href);
      }
    });

    // Fix inline script imports
    var scripts = document.querySelectorAll('script');
    scripts.forEach(function(script) {
      if (script.textContent && script.textContent.indexOf('import(') !== -1) {
        var originalText = script.textContent;
        var updatedText = originalText
          .replace(/import\("\/(?!rolandoquintana_pages_svelte)/g, 'import("' + base + '/')
          .replace(/base: "\/rolandoquintana_pages_svelte"/g, 'base: base')
          .replace(/assets: "\/rolandoquintana_pages_svelte"/g, 'assets: base');

        if (updatedText !== originalText) {
          script.textContent = updatedText;
          console.log('Fixed script imports');
        }
      }
    });
  }

  // Run immediately and after DOM is fully loaded
  fixImports();
  document.addEventListener('DOMContentLoaded', fixImports);
})();