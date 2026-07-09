/** Navbar navigation links */
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export const footerLinks = {
  quick: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  services: [
    { label: "Solar Installation", href: "#services" },
    { label: "System Design", href: "#services" },
    { label: "On-Grid Systems", href: "#products" },
    { label: "Hybrid Systems", href: "#products" },
    { label: "Commercial Plants", href: "#products" },
    { label: "Maintenance", href: "#services" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
  ],
};

/** Section IDs for scroll spy */
export const sectionIds = [
  "home",
  "about",
  "services",
  "projects",
  "why-us",
  "benefits",
  "process",
  "products",
  "faq",
  "testimonials",
  "contact",
] as const;
