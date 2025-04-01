<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  let isScrolled = false;

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 50;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<nav class:scrolled={isScrolled}>
  <div class="logo">
    <a href="{base}/">RQ</a>
  </div>
  <ul class="nav-links">
    <li><a href="{base}/#welcome">Home</a></li>
    <li><a href="{base}/#projects">Projects</a></li>
    <li><a href="{base}/#experience">Experience</a></li>
    <li><a href="{base}/#about">About</a></li>
    <li><a href="{base}/#contact">Contact</a></li>
  </ul>
</nav>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    transition: background-color 0.3s ease, padding 0.3s ease;
  }

  nav.scrolled {
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    padding: 1rem 2rem;
  }

  .logo a {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--secondary-color);
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .nav-links a {
    color: var(--text-color);
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 0.9rem;
    letter-spacing: 0.05em;
  }

  .nav-links a:hover {
    color: var(--secondary-color);
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
  }
</style>