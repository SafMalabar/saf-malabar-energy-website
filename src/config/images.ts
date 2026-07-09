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
    solar: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80",
  },
  about: {
    team: "https://images.unsplash.com/photo-1558449028-b53aee39cff7?w=800&q=80",
  },
} as const;
