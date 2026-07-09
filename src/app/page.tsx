import { Navbar, Footer } from "@/components/layout";
import {
  Hero,
  Trust,
  About,
  Services,
  Projects,
  WhyChooseUs,
  Benefits,
  Process,
  Products,
  FAQ,
  Testimonials,
  CTA,
  Contact,
} from "@/components/sections";
import {
  getPublishedTestimonials,
  getPublishedProjects,
  getPublishedFaqs,
  getPublishedServices,
  getCompanySettings,
} from "@/lib/data";

export default async function Home() {
  const [testimonials, projects, faqs, services, company] = await Promise.all([
    getPublishedTestimonials(),
    getPublishedProjects(),
    getPublishedFaqs(),
    getPublishedServices(),
    getCompanySettings(),
  ]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Trust />
        <About />
        <Services items={services} />
        <Projects items={projects} />
        <WhyChooseUs />
        <Benefits />
        <Process />
        <Products />
        <FAQ items={faqs} />
        <Testimonials items={testimonials} />
        <CTA />
        <Contact companyData={company} />
      </main>
      <Footer />
    </>
  );
}
