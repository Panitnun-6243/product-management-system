const express = require("express");
const app = express();
const port = 3000;

// Middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Middleware for parsing JSON
app.use(express.json());

app.get("/products", (req, res) => {
  res.send("List of products");
});

app.listen(port, () => {
  console.log(`Server running at <http://localhost>:${port}/`);
});
