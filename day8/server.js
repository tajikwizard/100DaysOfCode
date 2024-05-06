// const express = require("express");
// const app = express();

const products = [
  { id: 1, productTitle: "Honor 5s", price: 10 },
  { id: 2, productTitle: "Honor", price: 20 },
  { id: 3, productTitle: "Galaxy", price: 50 },
];

// // Default route
// app.get("/", (req, res) => {
//   res.send("Hello! Welcome to the products API.");
// });

// // Route to get list of products
// app.get("/products", (req, res) => {
//   res.json(products);
// });

// // Route to get product by ID
// app.get("/product", (req, res) => {
//   const id = req.query.id;
//   if (!id) {
//     return res.status(400).send("Please provide an id parameter");
//   }

//   const product = products.find((p) => p.id === parseInt(id));
//   if (!product) {
//     return res.status(404).send("Product not found");
//   }

//   res.json(product);
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const http = require("http");
const { URL } = require("url");

const port = 8080;
const localhost = "127.0.0.1";

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && parsedUrl.pathname === "/products") {
    if (parsedUrl.searchParams.has("id")) {
      const productId = parseInt(parsedUrl.searchParams.get("id"));
      const product = products.find((p) => p.id === productId);
      if (product) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(product));
      } else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Product not found");
      }
    } else {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(products));
    }
  } else if (
    req.method === "DELETE" &&
    parsedUrl.pathname === "/products" &&
    parsedUrl.searchParams.has("id")
  ) {
    const productId = parseInt(parsedUrl.searchParams.get("id"));
    const index = products.findIndex((p) => p.id === productId);
    if (index !== -1) {
      products.splice(index, 1);
      res.writeHead(200, { "content-type": "text/plain" });
      res.end("DELETED " + productId);
    } else {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("Product not found");
    }
  } else if (
    req.method === "PUT" &&
    parsedUrl.pathname === "/products" &&
    parsedUrl.searchParams.has("id")
  ) {
    const productId = parseInt(parsedUrl.searchParams.get("id"));
    const productName = parsedUrl.searchParams.get("name");
    const productPrice = parsedUrl.searchParams.get("price");
    if (productId && productName && productPrice) {
      const index = products.findIndex((p) => p.id === productId);
      if (index !== -1) {
        products[index].productTitle = productName;
        products[index].price = productPrice;
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(products[index]));
      } else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Product not found");
      }
    } else {
      res.writeHead(400, { "content-type": "text/plain" });
      res.end("Bad request: Product ID and name are required");
    }
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Invalid request");
  }
});

server.listen(port, localhost, () => {
  console.log(`Server running at http://${localhost}:${port}/`);
});
