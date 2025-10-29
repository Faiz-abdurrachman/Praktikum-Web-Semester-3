// Import semua module yang dibutuhkan
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

// Inisialisasi express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke Database MySQL
const db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "praktikum_web",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// =========================
// ROUTES CRUD STUDENTS
// =========================

// GET semua data mahasiswa
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST tambah data mahasiswa
app.post("/students", (req, res) => {
  console.log("Request Body:", req.body); // Debugging
  const { nim, name } = req.body;

  if (!nim || !name) {
    console.error("❗ Missing fields in request body");
    return res.status(400).json({ error: "NIM and Name are required" });
  }

  db.query(
    "INSERT INTO students (nim, name) VALUES (?, ?)",
    [nim, name],
    (err, results) => {
      if (err) {
        console.error("💥 Database Insertion Error:", err);
        return res
          .status(500)
          .json({ error: "Database error", details: err.message });
      }
      res.status(201).json({ id: results.insertId, nim, name });
    }
  );
});

// PUT update data mahasiswa
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { nim, name } = req.body;

  if (!nim || !name) {
    return res.status(400).json({ error: "NIM and Name are required" });
  }

  db.query(
    "UPDATE students SET nim = ?, name = ? WHERE id = ?",
    [nim, name, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, nim, name });
    }
  );
});

// DELETE hapus data mahasiswa
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM students WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
});

// =========================
// JALANKAN SERVER
// =========================
const PORT = 5003;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
