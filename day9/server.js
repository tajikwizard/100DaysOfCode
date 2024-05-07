const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 8080;
const localhost = "127.0.0.1";

app.get("/", (req, res) => {
  res.send(
    "<form action='/save-user' method='POST'><label>Name:</label><input type='text' name='username' placeholder='Enter you name...' /><button>Submit</button></form>"
  );
});

app.post("/save-user", (req, res) => {
  const userName = req.body.username;
  const filePath = path.join(__dirname, "user.json");

  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);
  existingUsers.push(userName);
  fs.writeFileSync(filePath, JSON.stringify(existingUsers));
  res.send(`<h2>Hello ${userName}  you are saved in user.json</h2>`);
});
app.get("/users", (req, res) => {
  const filePath = path.join(__dirname, "user.json");
  const fileData = fs.readFileSync(filePath);
  const jsonData = JSON.parse(fileData);
  res.json(jsonData);
});

app.listen(port, function () {
  console.log(`Server is running on port http://${localhost}:${port}`);
});
