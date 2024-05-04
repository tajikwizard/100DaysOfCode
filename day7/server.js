const { URL } = require("url");
const http = require("http");
const localhost = "127.0.0.1";
const port = 8080;
const products = [
  {
    id: 1,
    name: "Product 1",
    price: 19.99,
    category: "Electronics",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inStock: true,
  },
  {
    id: 2,
    name: "Product 2",
    price: 29.99,
    category: "Clothing",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inStock: false,
  },
  {
    id: 3,
    name: "Product 3",
    price: 9.99,
    category: "Books",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inStock: true,
  },
  {
    id: 4,
    name: "Product 4",
    price: 49.99,
    category: "Home & Kitchen",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inStock: true,
  },
  {
    id: 5,
    name: "Product 5",
    price: 14.99,
    category: "Toys & Games",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inStock: false,
  },
];

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${localhost}:${port}`);
  const queryParams = new URLSearchParams(parsedUrl.search);
  if (parsedUrl.pathname === "/products") {
    if (queryParams.has("id")) {
      const productId = parseInt(queryParams.get("id"));
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
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Not found");
  }
});

server.listen(port, localhost, () => {
  console.log(`Server running at http://${localhost}:${port}/`);
});
