import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Plane, Hotel, Sparkles, MapPin, Compass, Waves, Mountain } from "lucide-react";
import Navbar from "@/components/Navbar";
import { TripOption } from "@/lib/mockData";

const typeIcons = {
  travel: Plane,
  explore: Compass,
  relax: Waves,
  adventure: Mountain,
};

const typeColors = {
  travel: "text-blue-400",
  explore: "text-primary",
  relax: "text-emerald-400",
  adventure: "text-orange-400",
};

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Try navigation state first, then sessionStorage fallback
  let trip: TripOption | undefined = (location.state as { trip?: TripOption })?.trip;
  if (!trip) {
    try {
      const stored = sessionStorage.getItem("tripcare_trips");
      if (stored) {
        const trips: TripOption[] = JSON.parse(stored);
        trip = trips.find((t) => t.id === id);
      }
    } catch {
      // ignore parse errors
    }
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold mb-4">Trip not found</h2>
          <p className="text-muted-foreground mb-6">The trip you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/")} className="gold-gradient text-primary-foreground px-6 py-2.5 rounded-lg font-semibold">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button
              onClick={() => navigate("/results")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-6"
            >
              <ArrowLeft className="h-4 w-4" /> Back to results
            </button>

            {/* Header */}
            <div className="glass-card p-8 mb-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <span className={`badge-${trip.badge}`}>{trip.badgeLabel}</span>
                  <h1 className="font-display text-3xl md:text-4xl font-bold mt-3 flex items-center gap-3">
                    <MapPin className="h-7 w-7 text-primary" />
                    {trip.destination}
                  </h1>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold gold-text">₹{trip.totalCost.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">estimated total</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-card p-4 text-center">
                  <Calendar className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">{trip.suggestedDates}</div>
                  <div className="text-xs text-muted-foreground">Dates</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <Clock className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">{trip.leaveDaysUsed} days off</div>
                  <div className="text-xs text-muted-foreground">Leave used</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <Plane className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">₹{trip.flightPrice.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Flights</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <Hotel className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">₹{trip.hotelPerNight.toLocaleString()}/night</div>
                  <div className="text-xs text-muted-foreground">Hotel</div>
                </div>
              </div>
            </div>

            {/* AI Insight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl bg-primary/10 border border-primary/20 p-6 mb-8"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">AI Insight</h3>
                  <p className="text-foreground/80 leading-relaxed">{trip.aiInsight}</p>
                </div>
              </div>
            </motion.div>

            {/* Itinerary */}
            <h2 className="font-display text-2xl font-bold mb-6">Day-by-Day Itinerary</h2>
            <div className="space-y-4">
              {trip.itinerary.map((day, i) => {
                const Icon = typeIcons[day.type];
                return (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 + 0.3 }}
                    className="glass-card p-5 flex items-start gap-4"
                  >
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                        <Icon className={`h-5 w-5 ${typeColors[day.type]}`} />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Day {day.day}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{day.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{day.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Book CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 text-center"
            >
              <button className="gold-gradient text-primary-foreground px-10 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
                Book This Trip
              </button>
              <p className="text-sm text-muted-foreground mt-3">Prices are estimates. You'll be redirected to booking partners.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TripDetail;
