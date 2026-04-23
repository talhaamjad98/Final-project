import express from "express";
import cors from "cors";
import pool from "./db.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Needed in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* =========================
   HEALTH CHECK
========================= */
app.get("/api/health", (req, res) => {
  res.json({ message: "API is running successfully 🚀" });
});

/* =========================
   GET USERS
========================= */
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Database query failed" });
  }
});

/* =========================
   ADD USER
========================= */
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Insert failed" });
  }
});

/* =========================
   SAVE RESERVATION
========================= */
app.post("/api/reservations", async (req, res) => {
  try {
    const { fullName, email, reservationDate, guests, comments } = req.body;

    const result = await pool.query(
      `INSERT INTO reservations 
      (full_name, email, reservation_date, guests, comments)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [fullName, email, reservationDate, guests, comments]
    );

    res.status(201).json({
      message: "Reservation saved successfully",
      data: result.rows[0],
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   GET ALL RESERVATIONS ✅
========================= */
app.get("/api/reservations", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reservations ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ========================= */
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});