/**
 * General utility functions used across the application
 */

/**
 * Safely checks if the current device is mobile (width < 768px)
 * Returns false if window is not available (SSR)
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.innerWidth < 768;
}

/**
 * Checks if the device supports touch input
 * Returns false if navigator is not available (SSR)
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error - for older browsers
    navigator.msMaxTouchPoints > 0
  );
}

/**
 * Gets the current window width
 * Returns 0 if window is not available (SSR)
 */
export function getWindowWidth(): number {
  if (typeof window === 'undefined') {
    return 0;
  }
  return window.innerWidth;
}

/**
 * Creates an escape key handler function
 * @param callback - Function to call when Escape key is pressed
 * @param condition - Optional condition that must be true for the handler to fire
 * @returns Event handler function
 */
export function createEscapeKeyHandler(
  callback: () => void,
  condition: boolean = true
): (e: KeyboardEvent) => void {
  return (e: KeyboardEvent) => {
    if (e.key === 'Escape' && condition) {
      callback();
    }
  };
}

/**
 * Sets the body overflow style
 * @param hidden - If true, sets overflow to 'hidden', otherwise 'unset'
 */
export function setBodyOverflow(hidden: boolean): void {
  if (typeof document === 'undefined') {
    return;
  }
  document.body.style.overflow = hidden ? 'hidden' : 'unset';
}

/**
 * Generates a random rotation value between min and max degrees
 * @param min - Minimum rotation in degrees (default: -7.5)
 * @param max - Maximum rotation in degrees (default: 7.5)
 * @returns Random rotation value
 */
export function getRandomRotation(min: number = -7.5, max: number = 7.5): number {
  return Math.random() * (max - min) + min;
}

/**
 * Safely clears a timeout reference
 * @param timeoutRef - Reference to a timeout (NodeJS.Timeout | null)
 */
export function clearTimeoutRef(timeoutRef: NodeJS.Timeout | null): void {
  if (timeoutRef) {
    clearTimeout(timeoutRef);
  }
}

/**
 * Safely cancels an animation frame reference
 * @param rafRef - Reference to an animation frame (number | null)
 */
export function cancelAnimationFrameRef(rafRef: number | null): void {
  if (rafRef !== null) {
    cancelAnimationFrame(rafRef);
  }
}

/**
 * Defers a state update to avoid hydration mismatches
 * Useful for client-only operations like Math.random()
 * @param callback - Function to execute after defer
 * @returns Cleanup function to clear the timeout
 */
export function deferStateUpdate(callback: () => void): () => void {
  const timer = setTimeout(callback, 0);
  return () => clearTimeout(timer);
}

