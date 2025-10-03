// backend/server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

let dbPromise = connectDB();

// ✅ API: Get all elements
app.get("/api/elements", async (req, res) => {
  const db = await dbPromise;
  const elements = await db.collection("elements")
    .find()
    .sort({ atomicNumber: 1 })
    .toArray();
  res.json(elements);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
