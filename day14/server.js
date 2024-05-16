import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

const port = 3000;
const localhost = "127.0.0.1";
let people = ["geddy", "neil", "alex"];
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/form", (req, res) => {
  res.send(`
  <link rel="stylesheet" type="text/css" href="/style.css">
  <form class="form" action="/main" method="POST">
    <label>Name</label>
    <input type="text" name="name" required />
    <button type="submit">Submit</button>
  </form>
  `);
});
app.post("/main", (req, res) => {
  const name = req.body.name;
  res.render("main", { name, people });
});
app.listen(port, () => {
  console.log(`server running http://${localhost}:${port}`);
});
