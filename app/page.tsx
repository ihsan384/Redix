import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import MidPageCTA from "@/components/MidPageCTA";
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

        {/* 4. Portfolio (proof before story) */}
        <Portfolio />

        {/* 5. Mid-Page CTA — conversion nudge */}
        <MidPageCTA />

        {/* 6. About */}
        <About />

        {/* 7. Why Choose Us */}
        <WhyChooseUs />

        {/* 8. Founders */}
        <Founders />

        {/* 9. Process */}
        <Process />

        {/* 10. Testimonials */}
        <Testimonials />

        {/* 11. FAQ */}
        <FAQ />

        {/* 12. CTA */}
        <CTA />

        {/* 13. Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </>
  );
}
