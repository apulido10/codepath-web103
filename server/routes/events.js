import express from "express";
import pool from "../config/database.js";

const router = express.Router();

// GET /api/events
// Returns every event joined with its venue name. Supports the stretch
// "filter by location" feature via an optional query param:
//   /api/events?location=3   -> only events at venue with id 3
router.get("/", async (req, res) => {
  try {
    const { location } = req.query;

    const values = [];
    let whereClause = "";

    if (location) {
      values.push(location);
      whereClause = `WHERE e.location_id = $${values.length}`;
    }

    const results = await pool.query(
      `
        SELECT
          e.*,
          l.name AS location_name,
          l.neighborhood AS location_neighborhood
        FROM events e
        JOIN locations l ON e.location_id = l.id
        ${whereClause}
        ORDER BY e.date ASC
      `,
      values,
    );

    res.json(results.rows);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
