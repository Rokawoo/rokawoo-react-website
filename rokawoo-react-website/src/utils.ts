export const getAssetUrl = (path: string): string => {
  return new URL(`./assets/${path}`, import.meta.url).href;
};

export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
};