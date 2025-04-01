// Runtime path correction for GitHub Pages
(function() {
  var base = '/rolandoquintana_pages_svelte';
  var links = document.getElementsByTagName('link');
  var scripts = document.getElementsByTagName('script');

  // Check if we need to add the base to import paths in scripts
  document.addEventListener('DOMContentLoaded', function() {
    var scriptElements = document.querySelectorAll('script');
    scriptElements.forEach(function(script) {
      if (script.textContent && script.textContent.indexOf('import(') !== -1) {
        var updatedContent = script.textContent
          .replace(/import\("\/(?!rolandoquintana_pages_svelte)/g, 'import("' + base + '/');
        if (updatedContent !== script.textContent) {
          script.textContent = updatedContent;
        }
      }
    });
  });
})();