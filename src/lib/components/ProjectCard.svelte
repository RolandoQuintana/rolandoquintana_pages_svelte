<script lang="ts">
  import { base } from '$app/paths';

  export let title: string;
  export let description: string;
  export let link: string;
  export let imageUrl: string | undefined = undefined;
  export let technologies: string[] = [];

  // Add base path to the link if it's a relative path and doesn't start with #
  $: processedLink = link.startsWith('/') ? `${base}${link}` : link;
  $: processedImageUrl = imageUrl && imageUrl.startsWith('/') ? `${base}${imageUrl}` : imageUrl;
</script>

<div class="gradient-card" data-card>
  <div class="card">
    {#if processedImageUrl}
      <div class="card-image" style="background-image: url({processedImageUrl})">
        <div class="image-overlay"></div>
      </div>
    {/if}
    <div class="card-content" class:has-image={processedImageUrl}>
      <div class="text-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div class="card-footer">
        {#if technologies.length > 0}
          <div class="technologies">
            {#each technologies as tech}
              <span class="tech-tag">{tech}</span>
            {/each}
          </div>
        {/if}
        <a href={processedLink} class="card-link">View Project</a>
      </div>
    </div>
  </div>
</div>

<style>
  .gradient-card {
    margin-bottom: 1rem;
  }

  .card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    aspect-ratio: 16 / 9;
    display: flex;
    flex-direction: column;
  }

  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, rgba(0, 255, 163, 0.2), transparent);
    border-radius: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .card:hover::before {
    opacity: 1;
  }

  .card-image {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: transform 0.3s ease;
  }

  .card:hover .card-image {
    transform: scale(1.05);
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0.7) 80%,
      rgba(0, 0, 0, 0.8) 100%
    );
  }

  .card-content {
    position: relative;
    z-index: 2;
    padding: 1.5rem;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: auto;
  }

  .text-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin: 0;
    line-height: 1.2;
  }

  p {
    margin: 0;
    opacity: 0.7;
    line-height: 1.4;
    font-size: 0.875rem;
  }

  .card-content.has-image {
    background: none;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .technologies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    flex: 1;
  }

  .tech-tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    background: rgba(0, 255, 163, 0.1);
    border: 1px solid rgba(0, 255, 163, 0.3);
    border-radius: 1rem;
    color: var(--secondary-color);
  }

  .card-link {
    display: inline-block;
    background: rgb(0, 255, 163);
    color: black;
    padding: 0.5rem 1.25rem;
    border-radius: 2rem;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    white-space: nowrap;
    font-size: 0.875rem;
  }

  .card-link:hover {
    background: rgb(0, 255, 163);
    transform: translateY(-1px);
    opacity: 0.9;
  }
</style>