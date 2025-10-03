// backend/db.js
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

async function connectDB() {
  if (!client.topology?.isConnected()) {
    await client.connect();
  }
  return client.db(process.env.DB_NAME || "chemlearn");
}

module.exports = connectDB;
