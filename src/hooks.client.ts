// This file handles client-side hooks
import type { HandleClientError } from '@sveltejs/kit';

export function handleError({ error, event }) {
  console.error('Client error:', error);

  return {
    message: 'An unexpected error occurred'
  };
}

export function init() {
  // Initialization logic here
  return {
    headless: false
  };
};