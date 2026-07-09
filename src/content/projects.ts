export type ProjectCategory = "residential" | "commercial" | "industrial";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  capacity: string;
  completedDate: string;
  savings: string;
  story: string;
  image: string;
}

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "industrial", label: "Industrial" },
];

export const projects: Project[] = [
  {
    id: "res-1",
    title: "Premium Villa Rooftop System",
    category: "residential",
    location: "Malappuram, Kerala",
    capacity: "5 kW",
    completedDate: "November 2025",
    savings: "₹4,200/month average",
    story:
      "A 4-bedroom villa with high AC load required careful shading analysis and inverter sizing. We installed 12 tier-1 panels with a hybrid-ready inverter, achieving 95% self-consumption during peak hours.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  },
  {
    id: "res-2",
    title: "Multi-Unit Apartment Complex",
    category: "residential",
    location: "Kozhikode, Kerala",
    capacity: "15 kW",
    completedDate: "August 2025",
    savings: "₹12,500/month shared",
    story:
      "Common-area and individual metering required a split-system design. Our engineering team coordinated with the residents' association for seamless net metering approval.",
    image: "https://images.unsplash.com/photo-1558449028-b53aee39cff7?w=800&q=80",
  },
  {
    id: "com-1",
    title: "Retail Showroom Solar Plant",
    category: "commercial",
    location: "Kozhikode, Kerala",
    capacity: "25 kW",
    completedDate: "June 2025",
    savings: "₹28,000/month",
    story:
      "Daytime-heavy load profile made this showroom an ideal commercial solar candidate. Installation completed over a weekend to avoid business disruption.",
    image: "https://images.unsplash.com/photo-1497440006064-46f21c4d8b6a?w=800&q=80",
  },
  {
    id: "com-2",
    title: "Hotel & Hospitality Complex",
    category: "commercial",
    location: "Malappuram, Kerala",
    capacity: "50 kW",
    completedDate: "March 2025",
    savings: "₹55,000/month",
    story:
      "Kitchen, laundry, and HVAC systems drove high energy costs. Our 50 kW plant offsets 70% of daytime consumption with room for future expansion.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
  },
  {
    id: "ind-1",
    title: "Textile Manufacturing Facility",
    category: "industrial",
    location: "Palakkad, Kerala",
    capacity: "100 kW",
    completedDate: "January 2025",
    savings: "₹1,10,000/month",
    story:
      "Heavy machinery and three-shift operations demanded industrial-grade inverters and reinforced mounting. Project delivered on schedule with zero production downtime.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
  },
  {
    id: "ind-2",
    title: "Food Processing Plant",
    category: "industrial",
    location: "Thrissur, Kerala",
    capacity: "200 kW",
    completedDate: "October 2024",
    savings: "₹2,20,000/month",
    story:
      "Cold storage and processing lines required 24/7 reliability. We deployed a monitored ground-mount array with remote performance dashboards for the facility manager.",
    image: "https://images.unsplash.com/photo-1466611653911-950815379e9b?w=800&q=80",
  },
];
