import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import WhyChooseUs from "@/components/WhyChooseUs";
import Founders from "@/components/Founders";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
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

        {/* 2. About */}
        <About />

        {/* 3. Services */}
        <Services />

        {/* 4. Portfolio */}
        <Portfolio />

        {/* 5. Why Choose Us */}
        <WhyChooseUs />

        {/* 6. Founders */}
        <Founders />

        {/* 7. Process */}
        <Process />

        {/* 8. Testimonials */}
        <Testimonials />

        {/* 9. CTA */}
        <CTA />

        {/* 10. Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </>
  );
}
