/**
 * Image paths — replace files in public/assets/ to update site images.
 * public/assets/brand/logo.png   → Company logo
 * public/assets/hero/solar.jpg    → Hero section background
 */
export const images = {
  brand: {
    logo: "/assets/brand/logo.png",
  },
  hero: {
    solar: "/assets/hero/solar.jpg",
  },
} as const;
