import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const server = new McpServer({
  name: "wonderly",
  version: "1.0.0",
});

server.tool(
  "plan_trip",
  "Plan a smart trip using AI. Finds the best travel dates by leveraging public holidays to maximize trip length with minimal leave days. Returns 3 options: Best Value, Longest Trip, and Cheapest.",
  {
    destination: z.string().describe("Where the user wants to travel, e.g. 'Goa', 'Paris', 'Bali'"),
    leaveDays: z.number().describe("How many leave/vacation days the user has available"),
    departure: z.string().describe("City the user is flying from, e.g. 'Mumbai', 'Delhi'"),
    budget: z.string().optional().describe("Approximate budget, e.g. '50000', 'flexible', 'budget traveler'"),
  },
  async ({ destination, leaveDays, departure, budget }) => {
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
        { "day": 1, "title": "Arrival", "description": "Description", "type": "travel" }
      ]
    },
    {
      "id": "longest-trip",
      "badge": "longest",
      "badgeLabel": "🌟 Longest Trip",
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
- itinerary type must be one of: travel, explore, relax, adventure
- leaveDaysUsed must be <= ${leaveDays}
- totalTripDays includes weekends + holidays
- flightPrice = round-trip from ${departure}
- totalCost = flightPrice + (hotelPerNight x (totalTripDays - 1))
- All prices in INR
- All dates must be after ${today}
- Full day-by-day itinerary for each trip`;

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

    // Format a human-readable summary for the MCP response
    const summary = parsed.trips
      .map((t: any) => `
${t.badgeLabel} — ${t.suggestedDates}
• ${t.totalTripDays} days total, only ${t.leaveDaysUsed} leave days used
• Holidays: ${t.publicHolidays.join(", ")}
• Flight: ₹${t.flightPrice.toLocaleString()} | Hotel: ₹${t.hotelPerNight.toLocaleString()}/night | Total: ₹${t.totalCost.toLocaleString()}
• AI Insight: ${t.aiInsight}
• Itinerary: ${t.itinerary.map((d: any) => `Day ${d.day}: ${d.title}`).join(" → ")}
      `.trim())
      .join("\n\n---\n\n");

    return {
      content: [
        {
          type: "text",
          text: `🌍 Wonderly Trip Plans for ${destination}\nDeparting from ${departure} | ${leaveDays} leave days | Budget: ${budget || "flexible"}\n\n${summary}`,
        },
      ],
    };
  }
);

async function main() {
  if (!process.env.GROQ_API_KEY) {
    console.error("❌  GROQ_API_KEY is not set.");
    process.exit(1);
  }
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("✅  Wonderly MCP server running");
}

main();
