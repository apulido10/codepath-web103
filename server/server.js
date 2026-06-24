import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import locationsRouter from "./routes/locations.js";
import eventsRouter from "./routes/events.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// In production the React app is built into client/dist.
const clientDist = path.join(__dirname, "..", "client", "dist");

app.use(express.json());

// JSON API. In development the Vite dev server proxies "/api" here; in
// production these routes are hit directly.
app.use("/api/locations", locationsRouter);
app.use("/api/events", eventsRouter);

// Serve the built React app and let client-side routing handle any non-API
// path (so refreshing /location/3 still loads the app).
app.use(express.static(clientDist));
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
