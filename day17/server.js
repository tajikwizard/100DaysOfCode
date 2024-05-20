import express from "express";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  if (req.query.msg === "failed") {
    res.locals.msg = "Sorry its not exsits";
  } else {
    res.locals.msg = "";
  }
  next();
});
app.get("/", (req, res) => {
  res.render("login");
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (password === "pass") {
    res.cookie("username", username);
    res.redirect("/welcome");
  } else {
    res.redirect("/?msg=failed");
  }
});
app.get("/welcome", (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.render("welcome", { username });
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
