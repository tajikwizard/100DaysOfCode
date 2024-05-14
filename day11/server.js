const http = require("http");

const products = [
  { id: 1, name: "apple" },
  { id: 2, name: "banana" },
  { id: 3, name: "orange" },
];
function parse(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        console.log(body);
        resolve({ name: body.replace("productName=", "") });
      } catch (err) {
        reject(err);
      }
    });
  });
}
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
        <h2>Add Product</h2>
        <form method="POST" action="/products">
            <input type="text" name="productName"/>
            <button type="submit">Submit</button>
        </form>
    `);
  } else if (req.url === "/products") {
    if (req.method === "POST") {
      parse(req).then((product) => {
        products.push(product);
        res.end(`Product created! \n ${JSON.stringify(products)}`);
      });
    } else if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(products));
    } else {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("Method not supported");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

server.listen(3000, "localhost", () => {
  console.log(`Server running at http://localhost:3000/`);
});
