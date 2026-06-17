import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// Connection details come from environment variables so that secrets
// (like the Render database password) never get committed to git.
// See .env.example for the variables you need to set.
const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  // Render's hosted Postgres requires SSL. This setting allows the
  // connection without needing to supply Render's CA certificate.
  ssl: { rejectUnauthorized: false },
};

const pool = new pg.Pool(config);

export default pool;
