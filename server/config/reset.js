import pool from "./database.js";
import keyboards from "./data.js";

// Drops the keyboards table if it already exists and recreates it with an
// appropriate schema for our list items. Running this gives us a clean slate.
const createKeyboardsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS keyboards;

    CREATE TABLE IF NOT EXISTS keyboards (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      layout VARCHAR(50),
      wireless BOOLEAN NOT NULL DEFAULT false,
      description TEXT,
      image VARCHAR(255)
    );
  `;

  await pool.query(createTableQuery);
  console.log("🎉 keyboards table created successfully");
};

// Seeds the keyboards table with the data from our Unit 1 list.
const seedKeyboardsTable = async () => {
  await createKeyboardsTable();

  for (const keyboard of keyboards) {
    const insertQuery = {
      text: `
        INSERT INTO keyboards (name, price, layout, wireless, description, image)
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
      values: [
        keyboard.name,
        keyboard.price,
        keyboard.layout,
        keyboard.wireless,
        keyboard.description,
        keyboard.image,
      ],
    };

    await pool.query(insertQuery);
    console.log(`✅ ${keyboard.name} added to the database`);
  }
};

const runReset = async () => {
  try {
    await seedKeyboardsTable();
  } catch (error) {
    console.error("❌ Error seeding the database:", error);
  } finally {
    await pool.end();
  }
};

runReset();
