import { Navbar, Footer } from "@/components/layout";
import {
  Hero,
  About,
  Services,
  WhyChooseUs,
  Benefits,
  Process,
  CTA,
  Contact,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Benefits />
        <Process />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
