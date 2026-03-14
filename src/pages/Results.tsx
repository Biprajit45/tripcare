import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import TripCard from "@/components/TripCard";
import LoadingScreen from "@/components/LoadingScreen";
import { TripOption } from "@/lib/mockData";

interface SearchState {
  destination: string;
  leaveDays: string;
  departure: string;
  budget: string;
}

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = (location.state as SearchState) || {};

  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState<TripOption[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!search.destination) {
      navigate("/");
      return;
    }

    const fetchTrips = async () => {
      try {
        const res = await fetch("/api/plan-trip", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            destination: search.destination,
            leaveDays: search.leaveDays,
            departure: search.departure,
            budget: search.budget,
          }),
        });

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();
        setTrips(data.trips);
        // Persist so TripDetail can access on direct load
        sessionStorage.setItem("tripcare_trips", JSON.stringify(data.trips));
      } catch (err) {
        console.error(err);
        setError("Failed to generate trip plans. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-6"
            >
              <ArrowLeft className="h-4 w-4" /> Back to search
            </button>

            <div className="flex items-center gap-3 mb-2">
              <MapPin className="h-6 w-6 text-primary" />
              <h1 className="font-display text-3xl md:text-4xl font-bold">
                Trip options for{" "}
                <span className="gold-text">{search.destination}</span>
              </h1>
            </div>
            <p className="text-muted-foreground">
              {error
                ? error
                : `We found ${trips.length} smart trip options based on your preferences. Here's how to make the most of your leave days.`}
            </p>
          </motion.div>

          {/* Trip Cards */}
          {error ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">{error}</p>
              <button
                onClick={() => navigate("/")}
                className="gold-gradient text-primary-foreground px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {trips.map((trip, i) => (
                <TripCard key={trip.id} trip={trip} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
