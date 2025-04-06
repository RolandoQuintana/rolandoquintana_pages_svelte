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
      title: 'COMPUTER\nENGINEER.',
      imageUrl: `${base}/slide3.jpg`
    },
    {
      title: 'VIDEOGRAPHY\nDABBLER.',
      imageUrl: `${base}/slide4.jpg`
    }
  ];

  // Static subtitle that doesn't change
  const subtitle = 'Hello 👋 I\'m Rolando. I like creating stuff.';

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
    <span class="identifier">• 002 PROJECTS</span>
    <div class="projects-container">
      <div class="project-description">
        <div class="description-content" class:active={activeDescriptionIndex === 0}>
          <h3>Prevent Fahrenheight 451</h3>
        </div>
        <div class="description-content" class:active={activeDescriptionIndex === 1}>
          <h3>Who doesn't like modular tech?</h3>
        </div>
        <div class="description-content" class:active={activeDescriptionIndex === 2}>
          <h3>Pls don't sue me</h3>
        </div>
      </div>
      <div class="project-cards">
        <ProjectCard
          title="FeedFreed"
          description="Break free from addictive algorithms while staying connected to the creators and communities you love."
          link="https://feedfreed.app"
          imageUrl="/feedfreed_hero.jpg"
          technologies={['Flutter', 'Dart', 'DOM']}
        />
        <ProjectCard
          title="E-Trivium"
          description="An innovative clothing eco-system that allows modular technology to be temporarily embedded into the fabric of the clothing."
          link="https://jessikasalinas.github.io/E-Trivium/"
          imageUrl="/etrivium_hero.jpg"
          technologies={['React Native', 'TypeScript', 'Node.js']}
        />
        <ProjectCard
          title="Cap Man"
          description="Definitly not a ripoff of a popular game made from scratch with a custom built CPU, assembly code, and a hat with gyro-sensors to control everything..."
          link="https://drive.google.com/file/d/1tc_fJnmRhAtzCoM98XKAAi_EcyH6bnrg/view?usp=drive_link"
          imageUrl="/capman_hero.jpg"
          technologies={['React', 'TypeScript', 'Node.js']}
        />
      </div>
    </div>
  </section>

  <section id="experience" class="experience">
    <span class="identifier">• 003 EXPERIENCE</span>
    <div class="experience-grid">
      <div class="gradient-card" data-card>
        <div class="card">
          <div class="card-content">
            <div class="experience-header">
              <span class="role highlight">Software Engineer</span>
              <h3>alphaMountain</h3>
              <span class="duration">May 2024 - Present</span>
            </div>
            <ul class="experience-list">
              <li>Reconstructed a company Chrome extension with <span class="highlight">over 10,000 users</span> to support the new Chrome Manifest V3 requirements. My solution solved the notorious problem of WebRequestBlocking deprecation.</li>
              <li>Created custom Support API that our clients use to submit disputes on domains programmatically -- <span class="highlight">0 to 1</span>.</li>
              <li>Worked on upgrading internal tools used by the company, which were built on Express.js with a Postgresql database.</li>
            </ul>
            <div class="tech-stack">
              <span class="tech-tag">JavaScript</span>
              <span class="tech-tag">Python</span>
              <span class="tech-tag">AWS Lambda</span>
              <span class="tech-tag">Express.js</span>
              <span class="tech-tag">PostgreSQL</span>
            </div>
          </div>
        </div>
      </div>

      <div class="gradient-card" data-card>
        <div class="card">
          <div class="card-content">
            <div class="experience-header">
              <span class="role highlight">Digital Design Intern</span>
              <h3>Texas Instruments</h3>
              <span class="duration">May 2023 - August 2023</span>
            </div>
            <ul class="experience-list">
              <li>Worked on a team to create comprehensive testing suites for Analog Signal Chain products. Tests were for RTL and GLS.</li>
              <li>Created several Python Scripts to automate the creation of predictable Verilog files (i.e., x detection and glitch detection files)</li>
            </ul>
            <div class="tech-stack">
              <span class="tech-tag">Python</span>
              <span class="tech-tag">Verilog</span>
              <span class="tech-tag">Cadence Suite</span>
              <span class="tech-tag">RTL</span>
            </div>
          </div>
        </div>
      </div>

      <div class="gradient-card" data-card>
        <div class="card">
          <div class="card-content">
            <div class="experience-header">
              <span class="role highlight">Back-End Intern</span>
              <h3>TravelPass Group</h3>
              <span class="duration">June 2022 - August 2022</span>
            </div>
            <ul class="experience-list">
              <li>Used Python on Django to build a tool for the finance team that helped save them <span class="highlight">hours a day</span> from doing work that could be automated</li>
              <li>Mentored by one of TravelPass's back-end teams to learn Elixir on Phoenix. Built a project that the DevOps team would use to test their deployment</li>
              <li>Worked on a team with other interns to automate a MySQL database to make part of the Gross Profit report more accessible to the executive board</li>
            </ul>
            <div class="tech-stack">
              <span class="tech-tag">Python</span>
              <span class="tech-tag">Django</span>
              <span class="tech-tag">Elixir</span>
              <span class="tech-tag">Phoenix</span>
              <span class="tech-tag">MySQL</span>
            </div>
          </div>
        </div>
      </div>

      <div class="gradient-card" data-card>
        <div class="card">
          <div class="card-content">
            <div class="experience-header">
              <span class="role highlight">Firmware Intern</span>
              <h3>Cirque</h3>
              <span class="duration">June 2021 - August 2021</span>
            </div>
            <ul class="experience-list">
              <li>Used C++ to create an API employed for testing an HID device. This included various projects such as writing unit tests to view and change settings and building a custom I2C Library to stress the I2C interface</li>
              <li>Helped organize the Confluence database according to different projects of the Cirque Teams</li>
            </ul>
            <div class="tech-stack">
              <span class="tech-tag">C++</span>
              <span class="tech-tag">I2C</span>
              <span class="tech-tag">HID</span>
              <span class="tech-tag">Confluence</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


  <section id="contact" class="contact">
    <span class="identifier">• 004 CONTACT</span>
    <div class="contact-content glass">
      <p>I'm always open to new opportunities and collaborations.</p>
      <div class="social-links">
        <a href="https://github.com/RolandoQuintana" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub Profile">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/rolandodquintana/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn Profile">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </a>
        <a href="mailto:rolando.d.quintana@gmail.com" class="social-link" aria-label="Email Contact">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </a>
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
    white-space: pre-line;
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
    gap: 1.5rem;
    justify-content: center;
    margin-top: 2rem;
  }

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    color: var(--text-color);
    text-decoration: none;
    transition: all 0.3s ease;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .social-link:hover {
    color: var(--secondary-color);
    background: rgba(0, 255, 163, 0.1);
    border-color: rgba(0, 255, 163, 0.3);
    transform: translateY(-2px);
  }

  .social-link svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  .experience-grid {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

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

  .experience-header {
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .role {
    display: block;
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .role.highlight {
    color: var(--secondary-color);
  }

  .experience-header h3 {
    color: var(--text-color);
    margin-bottom: 0.25rem;
    opacity: 0.8;
    font-size: 1rem;
  }

  .duration {
    display: block;
    font-size: 0.9rem;
    opacity: 0.7;
  }

  .experience-list {
    list-style-type: none;
    padding: 0;
    margin-bottom: 1.5rem;
  }

  .experience-list li {
    margin-bottom: 1rem;
    position: relative;
    padding-left: 1.5rem;
    opacity: 0.8;
  }

  .experience-list li::before {
    content: "•";
    color: var(--secondary-color);
    position: absolute;
    left: 0;
  }

  .highlight {
    color: var(--secondary-color);
    font-weight: 500;
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tech-tag {
    padding: 0.25rem 0.75rem;
    background: rgba(0, 255, 163, 0.1);
    border: 1px solid rgba(0, 255, 163, 0.3);
    border-radius: 1rem;
    color: var(--secondary-color);
    font-size: 0.875rem;
    transition: background 0.3s ease;
  }

  .tech-tag:hover {
    background: rgba(0, 255, 163, 0.2);
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

    .experience-grid {
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
