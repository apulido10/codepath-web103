import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import keyboardRouter from "./routes/keyboards.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve the path to the client folder (it lives alongside the server folder).
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, "..", "client");

app.use(express.json());

// Serve the static frontend (HTML, CSS, JS, images) from the client folder.
app.use(express.static(clientPath));

// API + detail routes for keyboards.
app.use("/keyboard", keyboardRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
