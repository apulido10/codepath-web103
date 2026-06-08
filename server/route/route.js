import express from "express";
import keyboards from "../keyboards.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.json(keyboards);
});
router.get("/:id", (req, res) => {
  const keyboard = keyboards.find(
    (keyboard) => keyboard.id === Number(req.params.id),
  );

  if (!keyboard) {
    return res.status(404).json({
      message: "Keyboard not found",
    });
  }

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
      <p>${keyboard.price}</p>
      <p>${keyboard.description}</p>
      <a href="/">Back Home</a>
    </article>
  </main>
</body>
</html>
  `);
});

export default router;
