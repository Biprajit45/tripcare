export interface TripOption {
  id: string;
  badge: "best" | "longest" | "cheapest";
  badgeLabel: string;
  badgeIcon: string;
  destination: string;
  suggestedDates: string;
  leaveDaysUsed: number;
  totalTripDays: number;
  publicHolidays: string[];
  flightPrice: number;
  hotelPerNight: number;
  totalCost: number;
  aiInsight: string;
  itinerary: ItineraryDay[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  type: "travel" | "explore" | "relax" | "adventure";
}

export const mockTrips: TripOption[] = [
  {
    id: "best-value",
    badge: "best",
    badgeLabel: "🏆 Best Value",
    badgeIcon: "trophy",
    destination: "Goa, India",
    suggestedDates: "Oct 30 – Nov 5, 2026",
    leaveDaysUsed: 2,
    totalTripDays: 7,
    publicHolidays: ["Diwali (Nov 1)", "Diwali Holiday (Nov 2)"],
    flightPrice: 8500,
    hotelPerNight: 3200,
    totalCost: 31900,
    aiInsight: "By taking just 2 leave days around Diwali, you get a full 7-day holiday! This is the smartest use of your leave balance.",
    itinerary: [
      { day: 1, title: "Arrival & Beach Sunset", description: "Arrive at Goa airport, check into your beachfront hotel, and catch a stunning sunset at Anjuna Beach.", type: "travel" },
      { day: 2, title: "Old Goa Heritage Walk", description: "Explore the UNESCO World Heritage churches of Old Goa, visit the Basilica of Bom Jesus.", type: "explore" },
      { day: 3, title: "Diwali Celebrations", description: "Experience Diwali in Goa! Enjoy local celebrations, fireworks on the beach, and festive food.", type: "explore" },
      { day: 4, title: "Water Sports Day", description: "Try parasailing, jet skiing, and banana boat rides at Baga Beach.", type: "adventure" },
      { day: 5, title: "Spice Plantation & Waterfalls", description: "Visit a spice plantation, take a spice tour, and swim at Dudhsagar Falls.", type: "adventure" },
      { day: 6, title: "Beach Hopping & Relaxation", description: "Visit Palolem Beach, enjoy a yoga session, and relax with an Ayurvedic massage.", type: "relax" },
      { day: 7, title: "Departure", description: "Last-minute shopping at the Anjuna Flea Market before your flight home.", type: "travel" },
    ],
  },
  {
    id: "longest-trip",
    badge: "longest",
    badgeLabel: "🌟 Longest Trip",
    badgeIcon: "star",
    destination: "Goa, India",
    suggestedDates: "Dec 24 – Jan 4, 2027",
    leaveDaysUsed: 4,
    totalTripDays: 12,
    publicHolidays: ["Christmas (Dec 25)", "New Year's Day (Jan 1)"],
    flightPrice: 12500,
    hotelPerNight: 4500,
    totalCost: 67000,
    aiInsight: "The Christmas to New Year window gives you a massive 12-day vacation with only 4 leave days. Perfect for a deep Goa experience!",
    itinerary: [
      { day: 1, title: "Arrival", description: "Arrive and settle into your resort in South Goa.", type: "travel" },
      { day: 2, title: "South Goa Beaches", description: "Explore the quieter beaches of South Goa — Palolem, Agonda, Cola.", type: "relax" },
      { day: 3, title: "Christmas Eve Celebrations", description: "Join midnight mass at a heritage church, enjoy Christmas Eve dinner.", type: "explore" },
      { day: 4, title: "Christmas Day", description: "Christmas brunch, beach time, and festive celebrations.", type: "relax" },
      { day: 5, title: "Kayaking & Dolphins", description: "Kayak through mangroves and spot dolphins at Chapora River.", type: "adventure" },
      { day: 6, title: "Spice & Culture", description: "Spice plantation visit and a traditional Goan cooking class.", type: "explore" },
      { day: 7, title: "North Goa Day", description: "Explore Vagator, Anjuna, and the famous Saturday Night Market.", type: "explore" },
      { day: 8, title: "Wellness Day", description: "Full day at a wellness retreat — yoga, meditation, Ayurvedic treatments.", type: "relax" },
      { day: 9, title: "Adventure Day", description: "Trekking, cliff jumping, and waterfall exploration.", type: "adventure" },
      { day: 10, title: "New Year's Eve", description: "Ring in the New Year at a beach party or a quiet candlelit dinner.", type: "explore" },
      { day: 11, title: "Recovery & Relaxation", description: "Lazy day at the pool, spa treatment, beach reading.", type: "relax" },
      { day: 12, title: "Departure", description: "Final morning swim and departure.", type: "travel" },
    ],
  },
  {
    id: "cheapest",
    badge: "cheapest",
    badgeLabel: "💰 Cheapest",
    badgeIcon: "wallet",
    destination: "Goa, India",
    suggestedDates: "Aug 15 – Aug 19, 2026",
    leaveDaysUsed: 2,
    totalTripDays: 5,
    publicHolidays: ["Independence Day (Aug 15)"],
    flightPrice: 5200,
    hotelPerNight: 1800,
    totalCost: 14400,
    aiInsight: "Monsoon season means the lowest prices! Goa in the rain is magical — lush green landscapes, fewer crowds, and incredible seafood season.",
    itinerary: [
      { day: 1, title: "Arrival & Monsoon Magic", description: "Arrive to a lush, green Goa. Check in and enjoy the dramatic monsoon skies.", type: "travel" },
      { day: 2, title: "Independence Day & Waterfalls", description: "Celebrate Independence Day, then visit the stunning Dudhsagar Falls at full flow.", type: "adventure" },
      { day: 3, title: "Heritage & Food Trail", description: "Explore Fontainhas (Latin Quarter), try authentic Goan fish curry, and visit local bakeries.", type: "explore" },
      { day: 4, title: "Monsoon Beach & Spa", description: "Walk on a dramatic, moody beach, followed by an affordable luxury spa session.", type: "relax" },
      { day: 5, title: "Departure", description: "Morning market visit for souvenirs before heading to the airport.", type: "travel" },
    ],
  },
];

export const loadingMessages = [
  "🌍 Scanning global flight databases...",
  "📅 Analyzing public holiday calendars...",
  "🧠 AI is optimizing your leave days...",
  "✈️ Finding the best flight deals...",
  "🏨 Comparing hotel prices...",
  "🎯 Calculating the smartest trip combinations...",
  "🌴 Almost there! Finalizing your dream trips...",
];
