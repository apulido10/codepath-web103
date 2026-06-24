import pool from "./database.js";
import { locations, events } from "./data.js";

// Drops and recreates the two related tables. `events` references `locations`
// via a foreign key, so we drop events first (or use CASCADE) and create
// locations before events. Running this gives us a clean, seeded slate.
const createTables = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;

    CREATE TABLE locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      neighborhood VARCHAR(255),
      capacity INTEGER,
      description TEXT,
      image VARCHAR(500)
    );

    CREATE TABLE events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      artist VARCHAR(255),
      genre VARCHAR(100),
      date TIMESTAMP NOT NULL,
      price NUMERIC(10, 2),
      description TEXT,
      location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE
    );
  `;

  await pool.query(createTableQuery);
  console.log("🎉 locations and events tables created successfully");
};

const seedLocationsTable = async () => {
  for (const location of locations) {
    const insertQuery = {
      text: `
        INSERT INTO locations (id, name, neighborhood, capacity, description, image)
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
      values: [
        location.id,
        location.name,
        location.neighborhood,
        location.capacity,
        location.description,
        location.image,
      ],
    };

    await pool.query(insertQuery);
    console.log(`✅ venue "${location.name}" added to the database`);
  }

  // Keep the SERIAL id sequence in sync with the manual ids we inserted above.
  await pool.query(
    "SELECT setval('locations_id_seq', (SELECT MAX(id) FROM locations))",
  );
};

const seedEventsTable = async () => {
  for (const event of events) {
    const insertQuery = {
      text: `
        INSERT INTO events (title, artist, genre, date, price, description, location_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      values: [
        event.title,
        event.artist,
        event.genre,
        event.date,
        event.price,
        event.description,
        event.location_id,
      ],
    };

    await pool.query(insertQuery);
    console.log(`  🎵 event "${event.title}" added to the database`);
  }
};

const runReset = async () => {
  try {
    await createTables();
    await seedLocationsTable();
    await seedEventsTable();
    console.log("🚀 Database reset complete");
  } catch (error) {
    console.error("❌ Error seeding the database:", error);
  } finally {
    await pool.end();
  }
};

runReset();
