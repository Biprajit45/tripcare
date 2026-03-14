import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadingMessages } from "@/lib/mockData";
import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full gold-gradient opacity-20 animate-ping" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold mb-6">AI is finding your best trips...</h2>

        <div className="h-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-muted-foreground"
            >
              {loadingMessages[msgIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-secondary rounded-full mt-8 mx-auto overflow-hidden">
          <motion.div
            className="h-full gold-gradient rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
