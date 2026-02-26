export const EASE = [0.33, 1, 0.68, 1];
export const DURATION_ENTRANCE = 0.5;
export const DURATION_CHILD = 0.4;
export const DURATION_FAST = 0.25;
export const DURATION_ICON = 0.2;
export const STAGGER = 0.06;
export const VIEWPORT_ONCE = { once: true, amount: 0.2 };
export const VIEWPORT_ONCE_MORE = { once: true, amount: 0.3 };

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

export function resolveTransition(reducedMotion, preset) {
  return reducedMotion ? { duration: 0 } : preset;
}
