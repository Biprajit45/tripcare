import Groq from "groq-sdk";
import type { Request, Response } from "express";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function planTripHandler(req: Request, res: Response) {
  const { destination, leaveDays, departure, budget } = req.body;

  if (!destination || !leaveDays || !departure) {
    res.status(400).json({ error: "destination, leaveDays, and departure are required" });
    return;
  }

  const today = new Date().toISOString().split("T")[0];

  const prompt = `You are a smart travel planning AI. A user wants to plan a trip:
- Destination: ${destination}
- Available leave days: ${leaveDays} days
- Departing from: ${departure}
- Budget: ${budget || "flexible"}
- Today's date: ${today}

Generate exactly 3 trip options using public holidays to maximize trip length with minimal leave:
1. Best Value — best cost/duration balance
2. Longest Trip — maximum days with available leave
3. Cheapest — lowest total cost

Return ONLY valid JSON, no markdown, no explanation:
{
  "trips": [
    {
      "id": "best-value",
      "badge": "best",
      "badgeLabel": "🏆 Best Value",
      "badgeIcon": "trophy",
      "destination": "${destination}",
      "suggestedDates": "e.g. Oct 30 – Nov 5, 2026",
      "leaveDaysUsed": 2,
      "totalTripDays": 7,
      "publicHolidays": ["Holiday Name (Date)"],
      "flightPrice": 8500,
      "hotelPerNight": 3200,
      "totalCost": 31900,
      "aiInsight": "2-3 sentences explaining why this option is smart",
      "itinerary": [
        { "day": 1, "title": "Arrival & First Impressions", "description": "Vivid description of the day", "type": "travel" },
        { "day": 2, "title": "...", "description": "...", "type": "explore" }
      ]
    },
    {
      "id": "longest-trip",
      "badge": "longest",
      "badgeLabel": "🌟 Longest Trip",
      "badgeIcon": "star",
      "destination": "${destination}",
      "suggestedDates": "...",
      "leaveDaysUsed": 4,
      "totalTripDays": 12,
      "publicHolidays": ["..."],
      "flightPrice": 12000,
      "hotelPerNight": 4000,
      "totalCost": 60000,
      "aiInsight": "...",
      "itinerary": [{ "day": 1, "title": "...", "description": "...", "type": "travel" }]
    },
    {
      "id": "cheapest",
      "badge": "cheapest",
      "badgeLabel": "💰 Cheapest",
      "badgeIcon": "wallet",
      "destination": "${destination}",
      "suggestedDates": "...",
      "leaveDaysUsed": 2,
      "totalTripDays": 5,
      "publicHolidays": ["..."],
      "flightPrice": 5000,
      "hotelPerNight": 1500,
      "totalCost": 14000,
      "aiInsight": "...",
      "itinerary": [{ "day": 1, "title": "...", "description": "...", "type": "travel" }]
    }
  ]
}

Rules:
- itinerary "type" must be one of: "travel", "explore", "relax", "adventure"
- leaveDaysUsed must be <= ${leaveDays}
- totalTripDays includes weekends + holidays (not just leave days)
- flightPrice = round-trip from ${departure}
- totalCost = flightPrice + (hotelPerNight x (totalTripDays - 1))
- All prices in INR
- All dates must be after ${today}
- Each trip needs a full day-by-day itinerary`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 8000,
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? "";
    const jsonStr = raw
      .replace(/^```json\n?/, "")
      .replace(/^```\n?/, "")
      .replace(/\n?```$/, "")
      .trim();

    const parsed = JSON.parse(jsonStr);
    res.json(parsed);
  } catch (err) {
    console.error("Groq API error:", err);
    res.status(500).json({ error: "Failed to generate trip plan" });
  }
}
