/** Navbar & footer navigation links */
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
] as const;

export const footerLinks = {
  quick: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Why Us", href: "#why-us" },
    { label: "Contact", href: "#contact" },
  ],
  services: [
    { label: "Solar Installation", href: "#services" },
    { label: "System Design", href: "#services" },
    { label: "Maintenance", href: "#services" },
    { label: "Residential Solar", href: "#services" },
  ],
};
