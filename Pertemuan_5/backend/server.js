// backend/server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke database (Database connection)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // sesuaikan (adjust this)
  database: "testdb",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Database connected!");
})

// =================== ROUTES ====================

// GET semua user (GET all users)
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// POST tambah user (POST add user)
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err) => {
    if (err) throw err;
    res.send({ message: "User added!" });
  });
});

// PUT edit user (PUT edit user)
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.query("UPDATE users SET name=?, email=? WHERE id=?", [name, email, id], (err) => {
    if (err) throw err;
    res.send({ message: "User updated!" });
  });
});

// DELETE hapus user (DELETE delete user)
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id=?", [id], (err) => {
    if (err) throw err;
    res.send({ message: "User deleted!" });
  });
});

// ===============================================

app.listen(5000, () => console.log("📡 Server running on http://localhost:5000"));