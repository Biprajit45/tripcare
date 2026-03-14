import { motion } from "framer-motion";
import { Calendar, Plane, Hotel, Clock, ArrowRight, Sparkles } from "lucide-react";
import { TripOption } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

interface TripCardProps {
  trip: TripOption;
  index: number;
}

const TripCard = ({ trip, index }: TripCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
      className="glass-card-hover overflow-hidden"
    >
      {/* Badge */}
      <div className="p-6 pb-0">
        <span className={`badge-${trip.badge}`}>{trip.badgeLabel}</span>
      </div>

      <div className="p-6 space-y-5">
        {/* Dates */}
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">{trip.suggestedDates}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {trip.leaveDaysUsed} leave days
            </span>
            <span>{trip.totalTripDays} days total</span>
          </div>
        </div>

        {/* Holidays leveraged */}
        <div className="space-y-1.5">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Holidays Leveraged</span>
          <div className="flex flex-wrap gap-1.5">
            {trip.publicHolidays.map((h) => (
              <span key={h} className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-3 gap-3">
          <div className="glass-card p-3 text-center">
            <Plane className="h-4 w-4 mx-auto mb-1 text-primary" />
            <div className="text-xs text-muted-foreground">Flights</div>
            <div className="font-semibold text-sm">₹{trip.flightPrice.toLocaleString()}</div>
          </div>
          <div className="glass-card p-3 text-center">
            <Hotel className="h-4 w-4 mx-auto mb-1 text-primary" />
            <div className="text-xs text-muted-foreground">Hotel/night</div>
            <div className="font-semibold text-sm">₹{trip.hotelPerNight.toLocaleString()}</div>
          </div>
          <div className="glass-card p-3 text-center">
            <Sparkles className="h-4 w-4 mx-auto mb-1 text-primary" />
            <div className="text-xs text-muted-foreground">Total</div>
            <div className="font-semibold text-sm gold-text">₹{trip.totalCost.toLocaleString()}</div>
          </div>
        </div>

        {/* AI insight */}
        <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
          <div className="flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-foreground/80 leading-relaxed">{trip.aiInsight}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/trip/${trip.id}`, { state: { trip } })}
            className="flex-1 text-sm px-4 py-2.5 rounded-lg border border-border text-foreground hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
          >
            View Details <ArrowRight className="h-4 w-4" />
          </button>
          <button className="flex-1 text-sm px-4 py-2.5 rounded-lg gold-gradient text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TripCard;
