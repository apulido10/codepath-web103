import express from "express";
import pool from "../config/database.js";

const router = express.Router();

// GET /api/locations
// Returns every venue, ordered by id.
router.get("/", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM locations ORDER BY id");
    res.json(results.rows);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/locations/:id
// Returns a single venue together with all of its events (soonest first).
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const locationResult = await pool.query(
      "SELECT * FROM locations WHERE id = $1",
      [id],
    );

    if (locationResult.rows.length === 0) {
      return res.status(404).json({ error: "Location not found" });
    }

    const eventsResult = await pool.query(
      "SELECT * FROM events WHERE location_id = $1 ORDER BY date ASC",
      [id],
    );

    res.json({
      ...locationResult.rows[0],
      events: eventsResult.rows,
    });
  } catch (error) {
    console.error("Error fetching location:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
