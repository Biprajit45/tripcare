import express from "express";
import cors from "cors";
import { planTripHandler } from "./planTrip.js";

if (!process.env.GROQ_API_KEY) {
  console.error("❌  GROQ_API_KEY is not set. Get a free key at https://console.groq.com/keys");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/plan-trip", planTripHandler);

app.listen(3001, () => {
  console.log("✅  API server running on http://localhost:3001");
});
