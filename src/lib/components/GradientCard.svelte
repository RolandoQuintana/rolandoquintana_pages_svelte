<script lang="ts">
  export let title: string;
  export let description: string;
  export let link: string;
</script>

<a href={link} class="gradient-card">
  <div class="content">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
  <div class="gradient-border"></div>
</a>

<style>
  .gradient-card {
    position: relative;
    display: block;
    padding: clamp(1rem, 3vw, 1.5rem);
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    text-decoration: none;
    color: var(--text-color);
    transition: transform 0.3s ease;
    overflow: hidden;
    height: 100%;
  }

  .gradient-card:hover {
    transform: translateY(-5px);
  }

  .content {
    position: relative;
    z-index: 1;
  }

  h3 {
    font-size: clamp(1.25rem, 3vw, 1.5rem);
    margin-bottom: 0.5rem;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  p {
    font-size: clamp(0.875rem, 2vw, 1rem);
    opacity: 0.8;
    line-height: 1.5;
  }

  .gradient-border {
    position: absolute;
    inset: 0;
    border-radius: 1rem;
    padding: 1px;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  @media (max-width: 480px) {
    .gradient-card {
      padding: 1rem;
    }

    h3 {
      margin-bottom: 0.3rem;
    }
  }
</style>