import { motion } from "framer-motion";
import { MapPin, Brain, GitCompare } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Enter your destination",
    description: "Tell us where you want to go and how many leave days you have.",
  },
  {
    icon: Brain,
    title: "AI finds best dates",
    description: "Our AI analyzes public holidays, flight prices, and weather to find optimal dates.",
  },
  {
    icon: GitCompare,
    title: "Compare & book",
    description: "Compare trip options side by side and book your perfect getaway.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            How <span className="gold-text">Wonderly</span> works
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Three simple steps to your smartest vacation ever.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-8 text-center"
            >
              <div className="gold-gradient w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <step.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="text-sm font-semibold text-primary mb-2">Step {i + 1}</div>
              <h3 className="font-display text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
