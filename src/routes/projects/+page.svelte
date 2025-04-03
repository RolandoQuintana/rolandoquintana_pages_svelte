<script lang="ts">
  export let data;
  console.log('Page Data:', data);
</script>

<div class="max-w-4xl mx-auto py-8 px-4">
  <h1 class="text-4xl font-bold mb-8">Projects</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#if data.projects && data.projects.length > 0}
      {#each data.projects as project}
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          {#if project.thumbnail}
            <img
              src={project.thumbnail}
              alt={project.title}
              class="w-full h-48 object-cover"
            />
          {/if}
          <div class="p-6">
            <h2 class="text-2xl font-bold mb-2">{project.title}</h2>
            <p class="text-gray-600 mb-4">{project.description}</p>

            {#if project.technologies && project.technologies.length > 0}
              <div class="mb-4">
                <div class="flex flex-wrap gap-2">
                  {#each project.technologies as tech}
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {tech}
                    </span>
                  {/each}
                </div>
              </div>
            {/if}

            <div class="flex gap-4">
              {#if project.githubUrl}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 hover:underline"
                >
                  GitHub
                </a>
              {/if}
              {#if project.liveUrl}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 hover:underline"
                >
                  Live Demo
                </a>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    {:else}
      <p class="col-span-2 text-center text-gray-600">No projects found. Create some in the Tina CMS admin panel.</p>
    {/if}
  </div>
</div>