import { company, faqs } from "@/content";

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: company.url,
    logo: `${company.url}/assets/brand/logo.png`,
    description: company.description,
    email: company.email,
    telephone: company.phones[0],
    foundingDate: String(company.founded),
    areaServed: {
      "@type": "State",
      name: "Kerala",
      containedInPlace: { "@type": "Country", name: "India" },
    },
    sameAs: Object.values(company.social),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
  "@id": `${company.url}/#localbusiness`,
    name: company.name,
    image: `${company.url}/assets/brand/logo.png`,
    url: company.url,
    telephone: company.phones[0],
    email: company.email,
    description: company.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Malappuram",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.051,
      longitude: 76.0711,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "₹₹",
    areaServed: company.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: company.url,
      },
    ],
  };

  const schemas = [organizationSchema, localBusinessSchema, faqSchema, breadcrumbSchema];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
