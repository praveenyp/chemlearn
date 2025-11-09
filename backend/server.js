// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Fraction = require("fraction.js");


const app = express();
app.use(cors());
app.use(express.json());

let dbPromise = connectDB();

// ✅ Elements API
app.get("/api/elements", async (req, res) => {
  try {
    const db = await dbPromise;
    const elements = await db
      .collection("elements")
      .find()
      .sort({ atomicNumber: 1 })
      .toArray();
    res.json(elements);
  } catch (err) {
    console.error("Error fetching elements:", err);
    res.status(500).json({ error: "Failed to fetch elements" });
  }
});

// ✅ Quizzes API — returns 10 random questions
app.get("/api/quizzes", async (req, res) => {
  try {
    const db = await dbPromise;
    const quizzes = await db
      .collection("quizzes")
      .aggregate([{ $sample: { size: 10 } }])
      .toArray();
    res.json(quizzes);
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

// ---------------- AI Reaction Balancer (OpenAI) ----------------


const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/ai-balance", async (req, res) => {
  try {
    const { equation } = req.body;
    if (!equation || !equation.includes("->")) {
      return res.status(400).json({
        error: "Please enter a valid equation (e.g., H2 + O2 -> H2O)",
      });
    }

    // ✅ Use the verified Gemini model name
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

    const prompt = `
You are a chemistry tutor.
Balance the following chemical equation and provide the final balanced equation clearly first,
then a short plain-English explanation.

Make sure your response starts exactly like this:
Balanced Equation: <your balanced version here>
Explanation: <your explanation here>

Equation: ${equation}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Try to split the output cleanly
    const [balancedPart, explanationPart] = text.split("Explanation:");

    const balanced = balancedPart
      ? balancedPart.replace("Balanced Equation:", "").trim()
      : "Could not identify balanced equation.";
    const explanation = explanationPart
      ? explanationPart.trim()
      : "No detailed explanation provided.";

    res.json({
      unbalanced: equation,
      balanced,
      explanation,
    });
  } catch (err) {
    console.error("AI balancer error:", err);
    res.status(500).json({
      error: "AI service unavailable or invalid API key. Please retry later.",
    });
  }
});






const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);
