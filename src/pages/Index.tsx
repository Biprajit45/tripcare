import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";
import HowItWorks from "@/components/HowItWorks";
import heroImage from "@/assets/hero-travel.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={heroImage} alt="Beautiful tropical coastline" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Travel <span className="gold-text">smarter</span>,<br />
              not harder
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-xl mx-auto font-light">
              AI-powered trip planning that maximizes your holidays by leveraging public holidays and smart scheduling.
            </p>
          </motion.div>

          <HeroSearch />
        </div>
      </section>

      {/* How it works */}
      <HowItWorks />

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-display gold-text font-bold">Wonderly</span>
          <span>© 2026 Wonderly. AI-powered travel planning.</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
