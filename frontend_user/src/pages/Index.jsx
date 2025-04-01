
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TopHotels from "@/components/TopHotels";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TopHotels />
      <Testimonials />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
