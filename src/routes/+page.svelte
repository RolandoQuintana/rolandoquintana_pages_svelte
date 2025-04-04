<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { base } from '$app/paths';
  import GradientCard from '$lib/components/GradientCard.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import ScrambleText from '$lib/components/ScrambleText.svelte';

  let currentSlideIndex = 0;
  let slideKey = 0;
  let activeDescriptionIndex = 0;
  let observer: IntersectionObserver;

  // Hero section slides
  const heroSlides = [
    {
      title: 'SOFTWARE\nDEVELOPER.',
      imageUrl: `${base}/slide1.jpg`
    },
    {
      title: 'PRODUCT\nDESIGNER.',
      imageUrl: `${base}/slide2.jpg`
    },
    {
      title: 'TECH\nINNOVATOR.',
      imageUrl: `${base}/slide3.jpg`
    },
    {
      title: 'CREATIVE\nTHINKER.',
      imageUrl: `${base}/slide4.jpg`
    }
  ];

  // Static subtitle that doesn't change
  const subtitle = 'Creating innovative solutions through code and design.';

  let currentTitle = heroSlides[0].title;
  let currentImageUrl = heroSlides[0].imageUrl;
  let intervalId: ReturnType<typeof setInterval>;

  onMount(() => {
    startSlideshow();
    setupProjectObserver();
    console.log('Initial activeDescriptionIndex:', activeDescriptionIndex);
  });

  function startSlideshow() {
    intervalId = setInterval(() => {
      currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
      slideKey++;
      currentTitle = heroSlides[currentSlideIndex].title;
      currentImageUrl = heroSlides[currentSlideIndex].imageUrl;
    }, 5000);
  }

  function setupProjectObserver() {
    const options = {
      root: null,
      rootMargin: '-40% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1.0]
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const card = entry.target;
          const parent = card.parentElement;
          if (parent) {
            const index = Array.from(parent.children).indexOf(card);
            console.log('Card in view:', index, 'ratio:', entry.intersectionRatio);
            activeDescriptionIndex = index;
          }
        }
      });
    }, options);

    // Wait for DOM to be ready
    setTimeout(() => {
      const projectCards = document.querySelectorAll('[data-card]');
      console.log('Found project cards:', projectCards.length);
      projectCards.forEach((card) => {
        observer.observe(card);
      });
    }, 100);
  }

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
    if (observer) observer.disconnect();
  });

  // Force a re-render of the ScrambleText component when slides change
  $: currentSlideIndex;

  // Add a key to force component re-render
  $: currentSlideKey = currentSlideIndex;

  // Watch for changes in activeDescriptionIndex
  $: {
    console.log('activeDescriptionIndex changed to:', activeDescriptionIndex);
  }
</script>

<svelte:head>
  <title>Rolando Quintana - Portfolio</title>
  <meta name="description" content="Personal portfolio of Rolando Quintana" />
</svelte:head>

<main>
  <Navbar />

  <section id="welcome" class="hero">
    <div class="hero-content">
      <span class="identifier">• 001 ROLANDO D QUINTANA</span>
      <div class="title-box">
        <ScrambleText
          text={heroSlides[0].title}
          targetText={currentTitle}
          speed={1.5}
          pauseDelay={100}
          className="title-text"
        />
      </div>
      <p class="subtitle">{subtitle}</p>
    </div>
    <div class="hero-background">
      {#each heroSlides as slide, i}
        <div
          class="slide-image"
          class:active={i === currentSlideIndex}
          style="background-image: url({slide.imageUrl})"
        ></div>
      {/each}
    </div>
  </section>

  <section id="projects" class="projects">
    <h2>Projects</h2>
    <div class="projects-container">
      <div class="project-description">
        <div class="description-content" class:active={activeDescriptionIndex === 0}>
          <h3>Beautiful Digital Experiences</h3>
        </div>
        <div class="description-content" class:active={activeDescriptionIndex === 1}>
          <h3>AI-Powered Productivity</h3>
        </div>
        <div class="description-content" class:active={activeDescriptionIndex === 2}>
          <h3>Data Made Clear</h3>
        </div>
      </div>
      <div class="project-cards">
        <ProjectCard
          title="Flutter Portfolio"
          description="A modern, responsive portfolio website built with Flutter and Firebase, showcasing clean design and smooth animations."
          link="#"
          imageUrl="/project1.jpg"
          technologies={['Flutter', 'Firebase', 'Dart']}
        />
        <ProjectCard
          title="Task Manager Pro"
          description="An innovative mobile app that revolutionizes how users interact with their daily tasks, featuring AI-powered scheduling."
          link="#"
          imageUrl="/project2.jpg"
          technologies={['React Native', 'TypeScript', 'Node.js']}
        />
        <ProjectCard
          title="Data Insights"
          description="A cutting-edge AI-powered analytics platform that transforms complex data into actionable insights through interactive visualizations."
          link="#"
          imageUrl="/project3.jpg"
          technologies={['Python', 'TensorFlow', 'React']}
        />
      </div>
    </div>
  </section>

  <section id="experience" class="experience">
    <h2>Experience</h2>
    <!-- Add experience content -->
  </section>

  <section id="about" class="about">
    <h2>About</h2>
    <div class="about-content">
      <div class="about-text">
        <p>
          I am a software developer with a keen eye for design and a passion for creating seamless user experiences.
          With expertise in Flutter and modern web technologies, I bring ideas to life through clean,
          efficient code and intuitive interfaces. test commit
        </p>
      </div>
      <div class="skills">
        <h3>Skills</h3>
        <div class="skills-grid">
          <span class="skill-tag">Flutter</span>
          <span class="skill-tag">Dart</span>
          <span class="skill-tag">React</span>
          <span class="skill-tag">TypeScript</span>
          <span class="skill-tag">Firebase</span>
          <span class="skill-tag">Node.js</span>
          <span class="skill-tag">UI/UX Design</span>
          <span class="skill-tag">Git</span>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="contact">
    <h2>Get in Touch</h2>
    <div class="contact-content glass">
      <p>I'm always open to new opportunities and collaborations.</p>
      <div class="social-links">
        <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>
    </div>
  </section>
</main>

<style>
  .splash-screen {
    position: fixed;
    inset: 0;
    background: var(--background-color);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 1;
    transition: opacity 0.5s ease;
  }

  .splash-screen.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .splash-content {
    text-align: center;
  }

  .loading-bar {
    width: 200px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--secondary-color), transparent);
    margin-top: 2rem;
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  main {
    /* Remove the initial opacity and transform */
    opacity: 1;
    transform: none;
    display: block;
    position: relative;
    z-index: 1;
  }

  section {
    padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem);
    max-width: none;
    width: 100%;
    margin: 0;
  }

  .container {
    max-width: 3000px;
    width: 100%;
    margin: 0 auto;
    position: relative;
  }

  .hero {
    position: relative;
    min-height: 100vh;
    height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 0;
    overflow: hidden;
    width: 100%;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    padding-left: clamp(2rem, 5vw, 6%);
    padding-top: 30vh;
    height: 100%;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
  }

  .identifier {
    display: block;
    font-size: clamp(0.75rem, 1.5vw, 0.875rem);
    letter-spacing: 0.1em;
    margin-bottom: clamp(1rem, 3vw, 2rem);
    opacity: 0.7;
  }

  .title-box {
    height: 300px;
    margin-bottom: 30px;
  }

  .subtitle {
    font-size: clamp(1.2rem, 2.5vw, 1.75rem);
    opacity: 0.8;
    font-weight: 400;
    margin: 0;
    max-width: 550px;
    line-height: 1.4;
  }

  .hero-background {
    position: absolute;
    top: 0;
    right: -50px;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 0;
    max-width: 1200px;
  }

  .slide-image {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    transform: none;
    background-size: cover;
    background-position: center right;
    background-repeat: no-repeat;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    border-radius: 0;
    mask-image: linear-gradient(to left, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent);
    -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent);
  }

  .slide-image.active {
    opacity: 0.8;
  }

  .projects-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    margin-top: 2rem;
    position: relative;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    align-items: start;
  }

  .project-description {
    position: sticky;
    top: 20vh;
    height: 60vh;
    padding-right: 2rem;
  }

  .description-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease, visibility 0.4s ease;
  }

  .description-content.active {
    opacity: 1;
    visibility: visible;
  }

  .description-content h3 {
    font-size: clamp(3rem, 5vw, 4.5rem);
    color: var(--secondary-color);
    margin: 0;
    line-height: 1.1;
    font-weight: 700;
    letter-spacing: -0.02em;
    max-width: 12ch;
  }

  .description-content p {
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    line-height: 1.3;
    margin: 0;
    opacity: 0.8;
    font-weight: 300;
    max-width: 25ch;
  }

  .tech-stack {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .tech-tag {
    padding: 0.5rem 1rem;
    background: rgba(0, 255, 163, 0.1);
    border: 1px solid rgba(0, 255, 163, 0.3);
    border-radius: 1rem;
    color: var(--secondary-color);
    font-size: 0.875rem;
  }

  .project-cards {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 20vh 0;
  }

  .contact-content {
    max-width: 600px;
    margin: 0 auto;
    padding: clamp(1rem, 3vw, 2rem);
    border-radius: 1rem;
    text-align: center;
  }

  .social-links {
    display: flex;
    gap: clamp(1rem, 3vw, 2rem);
    justify-content: center;
    margin-top: clamp(1rem, 3vw, 2rem);
    flex-wrap: wrap;
  }

  .social-links a {
    color: var(--text-color);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .social-links a:hover {
    color: var(--secondary-color);
  }

  .about-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: clamp(1rem, 3vw, 2rem);
    margin-top: clamp(1rem, 3vw, 2rem);
  }

  .about-text {
    padding: clamp(1rem, 3vw, 2rem);
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .skills {
    padding: clamp(1rem, 3vw, 2rem);
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .skills h3 {
    font-size: clamp(1.2rem, 2.5vw, 1.5rem);
    margin-bottom: clamp(1rem, 2.5vw, 1.5rem);
    color: var(--secondary-color);
  }

  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(0.3rem, 1vw, 0.5rem);
  }

  .skill-tag {
    padding: clamp(0.3rem, 1vw, 0.5rem) clamp(0.7rem, 1.5vw, 1rem);
    background: rgba(0, 255, 163, 0.1);
    border: 1px solid rgba(0, 255, 163, 0.3);
    border-radius: 1rem;
    color: var(--secondary-color);
    font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  }

@media (min-width: 2000px) {
    .hero {
        padding: 0 max(2rem, calc((100% - 1600px) / 2));
    }

    .hero-content {
        padding-left: 0;
    }
}

  @media (max-width: 1200px) {
    .hero-background {
      width: 55%;
      right: -30px;
    }

    .title-box {
      height: 240px;
    }

    .subtitle {
      max-width: 500px;
    }
  }

  @media (max-width: 1600px) {
    .title-box {
        height: clamp(100px, 20vw, 240px);
    }
}


  @media (max-width: 992px) {
    .hero-background {
      width: 50%;
      right: -20px;
    }

    .title-box {
      height: clamp(100px, 15vw, 240px);
    }

    .subtitle {
      max-width: 450px;
    }

    .projects-container {
      grid-template-columns: 1fr;
    }

    .project-description {
      display: none;
    }

    .project-cards {
      gap: 2rem;
      padding: 0;
    }
  }

  @media (max-width: 768px) {
    .hero {
      padding: 0 1rem;
    }

    .hero-background {
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }

    .slide-image {
      background-size: cover;
      background-position: center;
      top: 0;
      transform: none;
      mask-image: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.1));
      -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.1));
    }

    .slide-image.active {
      opacity: 0.7;
    }

    .hero-content {
      padding-top: 20vh;
    }

    .title-box {
      height: clamp(50px, 15vw, 240px);
    }

    .subtitle {
      max-width: 350px;
    }

    .projects-container {
      grid-template-columns: 1fr;
    }

    .about-content {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    section {
      padding: 2rem 1rem;
    }

    .hero-content {
      padding-top: 15vh;
    }

    .title-box {
      height: 50px;
    }

    .subtitle {
      max-width: 280px;
    }

    .social-links {
      gap: 1rem;
    }
  }



  .projects, .experience, .about, .contact {
    margin: 0 auto;
    max-width: 1200px;
  }
</style>
