<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  let isScrolled = false;

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 50;
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<nav class:scrolled={isScrolled}>
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
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    transition: all 0.3s ease;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 2rem;
  }

  nav.scrolled {
    background-color: rgba(0, 0, 0, 0.8);
    padding: 0.75rem 2rem;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
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