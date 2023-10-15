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
  Product.findById(req.params.id, (err, product) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.json(product);
  });
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
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, product) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      return res.json(product);
    }
  );
});

// Delete an existing product
app.delete("/products/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err, product) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.json({ success: "Delete product successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server running at <http://localhost>:${port}/`);
});
