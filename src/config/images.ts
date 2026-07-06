/**
 * Image paths — replace files in public/assets/ to update site images.
 * public/assets/brand/logo.png   → Company logo
 * public/assets/hero/hero.jpeg    → Hero section side image
 */
export const images = {
  brand: {
    logo: "/assets/brand/logo.png",
  },
  hero: {
    solar: "/assets/hero/hero.jpeg",
  },
} as const;
