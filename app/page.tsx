import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Founders from "@/components/Founders";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* 1. Hero */}
        <Hero />

        {/* 2. Trust Strip */}
        <TrustStrip />

        {/* 3. Services */}
        <Services />

        {/* 4. Portfolio (moved above About — proof before story) */}
        <Portfolio />

        {/* 5. About */}
        <About />

        {/* 6. Why Choose Us */}
        <WhyChooseUs />

        {/* 7. Founders */}
        <Founders />

        {/* 8. Process */}
        <Process />

        {/* 9. Testimonials */}
        <Testimonials />

        {/* 10. FAQ */}
        <FAQ />

        {/* 11. CTA */}
        <CTA />

        {/* 12. Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </>
  );
}
