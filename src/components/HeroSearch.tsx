import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Plane, Wallet } from "lucide-react";

const HeroSearch = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    destination: "",
    leaveDays: "",
    departure: "",
    budget: "",
  });

  const handleSearch = () => {
    navigate("/results", { state: form });
  };

  const fields = [
    { key: "destination", placeholder: "Where do you want to go? e.g. Goa, Paris, Bali...", icon: MapPin, label: "Destination" },
    { key: "leaveDays", placeholder: "How many leave days do you have?", icon: Calendar, label: "Leave Days" },
    { key: "departure", placeholder: "Where are you flying from?", icon: Plane, label: "Departure City" },
    { key: "budget", placeholder: "Approximate budget (optional)", icon: Wallet, label: "Budget" },
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (step < 3 && form[fields[step].key as keyof typeof form]) {
        setStep(step + 1);
      } else if (step === 3 || (step === 2 && form.departure)) {
        handleSearch();
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="glass-card p-2 search-glow"
      >
        {/* Show current input */}
        <div className="flex items-center gap-3 p-3">
          {(() => {
            const Icon = fields[step].icon;
            return <Icon className="h-5 w-5 text-primary shrink-0" />;
          })()}
          <input
            type="text"
            placeholder={fields[step].placeholder}
            value={form[fields[step].key as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [fields[step].key]: e.target.value })}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-lg font-light"
            autoFocus
          />
          <button
            onClick={() => {
              if (step < 3 && form[fields[step].key as keyof typeof form]) {
                setStep(step + 1);
              } else {
                handleSearch();
              }
            }}
            className="gold-gradient text-primary-foreground rounded-lg px-5 py-2.5 font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            {step < 2 ? "Next" : step === 2 ? "Next" : <><Search className="h-4 w-4" /> Find Trips</>}
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 pb-2">
          {fields.map((f, i) => (
            <button
              key={f.key}
              onClick={() => setStep(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? "w-8 bg-primary" : i < step ? "w-4 bg-primary/50" : "w-4 bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Filled fields */}
        {step > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="border-t border-border px-4 py-2 flex flex-wrap gap-2"
          >
            {fields.slice(0, step).map((f) => {
              const val = form[f.key as keyof typeof form];
              if (!val) return null;
              return (
                <span key={f.key} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                  {f.label}: {val}
                </span>
              );
            })}
          </motion.div>
        )}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-muted-foreground text-sm mt-4"
      >
        Try: "I want to visit Goa" or "Plan a trip to Paris"
      </motion.p>
    </div>
  );
};

export default HeroSearch;
