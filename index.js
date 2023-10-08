const express = require("express");
const app = express();
const port = 3000;

// middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// middleware for parsing JSON
app.use(express.json());

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1000, stock: 5 },
  { id: 2, name: "Phone", category: "Electronics", price: 500, stock: 10 },
];

// GET all products
app.get("/products", (req, res) => {
  res.json(products);
});

// GET a single product by ID
app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  res.json(product);
});

//Post a new product
app.post("/products", (req, res) => {
  const product = {
    id: products.length + 1,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
  };
  products.push(product);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server running at <http://localhost>:${port}/`);
});
