const e = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

// connect MongoDB
mongoose.connect("mongodb://localhost:27017/productDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create Schema and Model
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  stock: Number,
});

const Product = mongoose.model("Product", productSchema);

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
  Product.find((err, products) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.json(products);
  });
});

// GET a single product by ID
app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  res.json(product);
});

//Post a new product
app.post("/products", (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save((err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.status(201).json({ success: "Create product successfully" });
  });
});

// Put an existing product
app.put("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");

  product.name = req.body.name;
  product.category = req.body.category;
  product.price = req.body.price;
  product.stock = req.body.stock;

  res.json(product);
});

// Delete an existing product
app.delete("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");

  const index = products.indexOf(product);
  products.splice(index, 1);

  res.json(product);
});

app.listen(port, () => {
  console.log(`Server running at <http://localhost>:${port}/`);
});
