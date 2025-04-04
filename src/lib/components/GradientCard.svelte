<script lang="ts">
  import { base } from '$app/paths';

  export let title: string;
  export let description: string;
  export let link: string;

  // Add base path to the link if it's a relative path and doesn't start with #
  $: processedLink = link.startsWith('/') ? `${base}${link}` : link;
</script>

<div class="gradient-card" data-card>
  <div class="card">
    <div class="card-content">
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={processedLink} class="card-link">View Project</a>
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
  }

  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, rgba(0, 255, 163, 0.2), transparent);
    border-radius: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .card:hover::before {
    opacity: 1;
  }

  .card-content {
    padding: clamp(1.5rem, 3vw, 2rem);
    position: relative;
    z-index: 2;
  }

  h3 {
    font-size: clamp(1.2rem, 2.5vw, 1.5rem);
    margin-bottom: 1rem;
    color: var(--secondary-color);
  }

  p {
    margin-bottom: clamp(1.5rem, 3vw, 2rem);
    opacity: 0.8;
  }

  .card-link {
    display: inline-block;
    background: rgba(0, 255, 163, 0.1);
    color: var(--secondary-color);
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    text-decoration: none;
    border: 1px solid rgba(0, 255, 163, 0.3);
    transition: background 0.3s ease;
  }

  .card-link:hover {
    background: rgba(0, 255, 163, 0.2);
  }
</style>