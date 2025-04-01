<script lang="ts">
  let currentSection = 'welcome';
</script>

<nav>
  <ul>
    <li>
      <a
        href="#welcome"
        class:active={currentSection === 'welcome'}
        on:click={() => currentSection = 'welcome'}
      >
        WELCOME
        {#if currentSection === 'welcome'}
          <span class="dot">•</span>
        {/if}
      </a>
    </li>
    <li>
      <a
        href="#projects"
        class:active={currentSection === 'projects'}
        on:click={() => currentSection = 'projects'}
      >
        PROJECTS
        {#if currentSection === 'projects'}
          <span class="dot">•</span>
        {/if}
      </a>
    </li>
    <li>
      <a
        href="#experience"
        class:active={currentSection === 'experience'}
        on:click={() => currentSection = 'experience'}
      >
        EXPERIENCE
        {#if currentSection === 'experience'}
          <span class="dot">•</span>
        {/if}
      </a>
    </li>
    <li>
      <a
        href="#about"
        class:active={currentSection === 'about'}
        on:click={() => currentSection = 'about'}
      >
        ABOUT
        {#if currentSection === 'about'}
          <span class="dot">•</span>
        {/if}
      </a>
    </li>
  </ul>
</nav>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: clamp(1rem, 4vw, 2rem);
    background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%);
  }

  ul {
    display: flex;
    justify-content: center;
    gap: clamp(1.5rem, 4vw, 4rem);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: var(--text-color);
    text-decoration: none;
    font-size: clamp(0.7rem, 1.5vw, 0.875rem);
    letter-spacing: 0.1em;
    position: relative;
    opacity: 0.7;
    transition: all 0.3s ease;
    padding-bottom: 0.25rem;
  }

  a:hover {
    opacity: 1;
  }

  a.active {
    opacity: 1;
    color: var(--secondary-color);
  }

  a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--secondary-color);
    transition: width 0.3s ease;
  }

  a.active::after {
    width: 100%;
  }

  a:hover::after {
    width: 100%;
  }

  .dot {
    position: absolute;
    top: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    color: var(--secondary-color);
    font-size: 1.2em;
  }

  @media (max-width: 1200px) {
    ul {
      gap: 3rem;
    }
  }

  @media (max-width: 992px) {
    ul {
      gap: 2.5rem;
    }
  }

  @media (max-width: 768px) {
    nav {
      padding: 1rem;
    }

    ul {
      gap: 1.5rem;
    }

    a {
      font-size: 0.7rem;
    }
  }

  @media (max-width: 480px) {
    ul {
      gap: 1rem;
    }

    a {
      font-size: 0.65rem;
      letter-spacing: 0.05em;
    }
  }
</style>