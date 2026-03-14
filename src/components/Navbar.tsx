import { Compass, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ background: "linear-gradient(to bottom, hsl(222 47% 6% / 0.9), transparent)" }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="gold-gradient p-2 rounded-lg">
            <Compass className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold gold-text">Wonderly</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How it works
          </a>
          <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-border hover:border-primary/50 transition-colors text-muted-foreground hover:text-foreground">
            <Sparkles className="h-4 w-4" />
            AI Powered
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
