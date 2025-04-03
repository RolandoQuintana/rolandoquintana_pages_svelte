<script>
  import '../app.css';
  import { base } from '$app/paths';
</script>

<div class="min-h-screen bg-gray-50">
  <nav class="bg-white shadow-sm">
    <div class="max-w-4xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <a href="{base}/" class="flex items-center text-gray-900 hover:text-gray-600">
            Home
          </a>
          <a href="{base}/projects" class="flex items-center ml-8 text-gray-900 hover:text-gray-600">
            Projects
          </a>
        </div>
      </div>
    </div>
  </nav>

  <main>
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