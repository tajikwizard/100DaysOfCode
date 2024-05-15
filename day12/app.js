const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productsDb = require("./db/products");
const logger = require("./loggerModule");

const app = express();
//my custom middleware to show everything about path
app.use(logger);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // This will parse JSON bodies

app.get("/", (req, res) => {
  res.send("Hello! Welcome to the products API.");
});

app.get("/products", (req, res) => {
  res.json(productsDb);
});

app.get("/api/products", (req, res) => {
  res.json(productsDb);
});

app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = productsDb.find((p) => p.id === id);
  res.json(product);
});

app.post("/api/products", (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    id: productsDb.length + 1,
    name,
    price: Number(price),
  };
  productsDb.push(newProduct);
  res.status(201).json(newProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productIndex = productsDb.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }
    productsDb.splice(productIndex, 1);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/products/:id", (req, res) => {
  console.log(req.body);
  res.send("Deleted Successfully");
});

// app.get('/api/query', (req, res) => {
//     const name = req.query.name.toLowerCase()
//     const products_result = products.filter(product => product.name.toLowerCase().includes(name))

//     if (products_result.length < 1) {
//         return res.status(200).send('No products matched your search')
//     }
//     res.json(products_result)
// })

app.get("/about", (req, res) => {
  console.log(req.url);
  console.log(req.params);
  console.log(req.query);
  return res.send("About Page");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
