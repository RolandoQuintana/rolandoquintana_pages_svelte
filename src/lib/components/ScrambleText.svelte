<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  // Props
  export let text = ''; // Current text to display
  export let targetText: string | null = null; // Text to scramble to
  export let speed = 500; // ms per character (very slow typing)
  export let backspaceSpeed = 100; // ms per character when backspacing
  export let autoStart = true; // Whether to start animation on mount
  export let pauseDelay = 0; // Pause time (ms) before starting new scramble
  export let className = ''; // CSS class for styling

  // Internal state
  let displayText = text;
  let currentIndex = 0;
  let isBackspacing = false;
  let interval: ReturnType<typeof setTimeout>;
  let blinkInterval: ReturnType<typeof setInterval>;
  let cursorVisible = true;
  let isTyping = false;

  // Helper function to get random typing speed
  function getRandomTypingSpeed(): number {
    // Base speed of 100ms with random variation between -50ms and +50ms
    return 100 + (Math.random() * 100 - 50);
  }

  onMount(() => {
    if (targetText) {
      startTransition(targetText);
    }

    // Blink cursor every 500ms but only when not typing
    blinkInterval = setInterval(() => {
      if (!isTyping) {
        cursorVisible = !cursorVisible;
      }
    }, 500);
  });

  onDestroy(() => {
    if (interval) clearTimeout(interval);
    if (blinkInterval) clearInterval(blinkInterval);
  });

  // Watch for changes to targetText
  $: if (browser && targetText) {
    startTransition(targetText);
  }

  function startTransition(target: string) {
    if (interval) clearTimeout(interval);
    isBackspacing = true;
    currentIndex = displayText.length;
    isTyping = true;
    cursorVisible = true;

    function updateText() {
      if (isBackspacing) {
        if (currentIndex > 0) {
          currentIndex--;
          displayText = displayText.slice(0, currentIndex);
          interval = setTimeout(updateText, 50); // Consistent backspace speed
        } else {
          isBackspacing = false;
          currentIndex = 0;
          interval = setTimeout(updateText, getRandomTypingSpeed());
        }
      } else {
        if (currentIndex < target.length) {
          displayText = target.slice(0, currentIndex + 1);
          currentIndex++;
          interval = setTimeout(updateText, getRandomTypingSpeed());
        } else {
          isTyping = false;
        }
      }
    }

    updateText();
  }
</script>

<h1 class="scramble-text {className}" style="white-space: pre-line;">
  {displayText}<span class="cursor" class:blink={!isTyping} class:visible={cursorVisible}>|</span>
</h1>

<style>
  .scramble-text {
    margin: 0;
    padding: 0;
    font-size: clamp(2.2rem, 7vw, 5rem) !important; /* Base size for mobile */
    line-height: 0.85;
    font-weight: 800;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    letter-spacing: -0.01em;
    max-width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    text-align: left;
  }

  .cursor {
    display: inline-block;
    color: var(--secondary-color);
    font-weight: 300;
    margin-left: -0.1em;
    animation: none;
  }

  .cursor.blink.visible {
    opacity: 1;
  }

  .cursor.blink:not(.visible) {
    opacity: 0;
  }

  /* Responsive breakpoints - using only min-width */
  @media (min-width: 480px) {
    .scramble-text {
      font-size: clamp(2.5rem, 8vw, 9rem) !important;
    }
  }

  @media (min-width: 768px) {
    .scramble-text {
      font-size: clamp(3rem, 9vw, 10rem) !important;
    }
  }

  @media (min-width: 992px) {
    .scramble-text {
      font-size: clamp(3.5rem, 10vw, 12rem) !important;
    }
  }

  @media (min-width: 1200px) {
    .scramble-text {
      font-size: clamp(4rem, 10vw, 14rem) !important;
    }
  }

  @media (min-width: 2000px) {
    .scramble-text {
      font-size: 12rem !important; /* Fixed size for 2000px and up */
      max-width: 100%;
      margin: 0;
      text-align: left;
    }
  }
</style>