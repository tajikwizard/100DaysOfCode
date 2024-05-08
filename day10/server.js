const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

const port = 8080;
const localhost = "127.0.0.1";

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  res.render("index", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});
app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/", (req, res) => {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  storedRestaurants.push(restaurant);
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  res.redirect("/");
});
app.listen(port, function () {
  console.log(`Server running at http://${localhost}:${port}/`);
});
