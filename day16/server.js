import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const localhost = "127.0.0.1";

const app = express();

app.post("/users", (req, res) => {
  res.status(201).json({
    message: "User registered successfully",
    user: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
  });
});

app.listen(port, () => {
  console.log(`Server running http://${localhost}:${port}`);
});
