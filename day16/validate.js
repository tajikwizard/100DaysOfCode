const validate = (req, res, next) => {
  if (req.method === "POST" && req.url === "/users") {
    const { name, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    const isStrongPassword = password && password.length >= 8;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!email || !isValidEmail) {
      return res.status(400).json({ message: "Valid email is required" });
    }
    if (!password || !isStrongPassword) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
  }
  next();
};

module.exports = validate;
