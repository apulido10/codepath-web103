import express from "express";
import pool from "../config/database.js";

const router = express.Router();

// GET /keyboard
// Returns all keyboards as JSON. Supports the stretch "search" feature:
//   /keyboard?search=keychron      -> matches name (case-insensitive)
//   /keyboard?layout=75%           -> filters by exact layout
//   /keyboard?wireless=true        -> filters by wireless support
router.get("/", async (req, res) => {
  try {
    const { search, layout, wireless } = req.query;

    const conditions = [];
    const values = [];

    if (search) {
      values.push(`%${search}%`);
      conditions.push(`name ILIKE $${values.length}`);
    }

    if (layout) {
      values.push(layout);
      conditions.push(`layout = $${values.length}`);
    }

    if (wireless !== undefined) {
      values.push(wireless === "true");
      conditions.push(`wireless = $${values.length}`);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const results = await pool.query(
      `SELECT * FROM keyboards ${whereClause} ORDER BY id`,
      values,
    );

    res.json(results.rows);
  } catch (error) {
    console.error("Error fetching keyboards:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /keyboard/:id
// Renders a detail page for a single keyboard pulled from the database.
router.get("/:id", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM keyboards WHERE id = $1", [
      req.params.id,
    ]);

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Keyboard not found" });
    }

    const keyboard = results.rows[0];

    res.send(`
 <!DOCTYPE html>
<html>
<head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
  >
</head>

<body>
  <main class="container">
    <article>
      <h1>${keyboard.name}</h1>
      <img src="${keyboard.image}" alt="${keyboard.name}">
      <p><strong>Price:</strong> $${keyboard.price}</p>
      <p><strong>Layout:</strong> ${keyboard.layout}</p>
      <p><strong>Wireless:</strong> ${keyboard.wireless ? "Yes" : "No"}</p>
      <p>${keyboard.description}</p>
      <a href="/">Back Home</a>
    </article>
  </main>
</body>
</html>
  `);
  } catch (error) {
    console.error("Error fetching keyboard:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
