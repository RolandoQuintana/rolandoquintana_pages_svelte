<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  let isScrolled = false;
  let activeSection = 'welcome';

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 50;
    };

    // Set up intersection observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            console.log('Section in view:', sectionId, 'intersection ratio:', entry.intersectionRatio);
            activeSection = sectionId;
          }
        });
      },
      {
        threshold: [0.2, 0.5, 0.8],
        rootMargin: '-20% 0px'
      }
    );

    // Wait for DOM to be fully loaded
    setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      console.log('Found sections:', sections.length);

      sections.forEach((section) => {
        console.log('Observing section:', section.id);
        observer.observe(section);
      });
    }, 100);

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  });
</script>

<nav class:scrolled={isScrolled}>
  <ul class="nav-links">
    <li><a href="{base}/#welcome" class:active={activeSection === 'welcome'}>Home</a></li>
    <li><a href="{base}/#projects" class:active={activeSection === 'projects'}>Projects</a></li>
    <li><a href="{base}/#experience" class:active={activeSection === 'experience'}>Experience</a></li>
    <li><a href="{base}/#contact" class:active={activeSection === 'contact'}>Contact</a></li>
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
    transition: all 0.3s ease;
    font-size: 0.9rem;
    letter-spacing: 0.05em;
    position: relative;
    padding: 0.5rem 0;
  }

  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--secondary-color);
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: right;
  }

  .nav-links a:hover::after,
  .nav-links a.active::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  .nav-links a:hover,
  .nav-links a.active {
    color: var(--secondary-color);
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
  }
</style>