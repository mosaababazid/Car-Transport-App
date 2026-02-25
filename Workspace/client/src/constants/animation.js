/**
 * Shared animation constants for consistent rhythm and feel across the site.
 * All entrance, hover, and scroll transitions use these for a unified UX.
 */

// Primary easing: smooth deceleration (matches CSS cubic-bezier site-wide)
export const EASE = [0.33, 1, 0.68, 1];

// Entrance (scroll-into-view): main section block
export const DURATION_ENTRANCE = 0.65;
// Child elements and staggered items
export const DURATION_CHILD = 0.5;
// Quick UI (overlay, nav items)
export const DURATION_FAST = 0.25;
// Icon toggle (burger menu)
export const DURATION_ICON = 0.2;
// Stagger delay between items (list/cards)
export const STAGGER = 0.06;

// Standard viewport options for scroll-triggered animations
export const VIEWPORT_ONCE = { once: true, amount: 0.2 };
export const VIEWPORT_ONCE_MORE = { once: true, amount: 0.3 };

// Framer transition presets (opacity + transform only for GPU-friendly motion)
export const transitionEntrance = {
  duration: DURATION_ENTRANCE,
  ease: EASE,
};
export const transitionChild = {
  duration: DURATION_CHILD,
  ease: EASE,
};
export const transitionFast = {
  duration: DURATION_FAST,
  ease: EASE,
};
export const transitionIcon = {
  duration: DURATION_ICON,
  ease: EASE,
};

/** When prefers-reduced-motion, return instant transition to avoid motion. */
export function resolveTransition(reducedMotion, preset) {
  return reducedMotion ? { duration: 0 } : preset;
}
