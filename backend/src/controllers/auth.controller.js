const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { name, email, password, role = "customer" } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ name }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User already exists",
    });
  }
  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    email,
    password: hash,
    role,
  });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token, {
    httpOnly: true, // Prevents client-side JS from reading the cookie (XSS protection)
    secure: true, // Set to true ONLY in production (requires HTTPS)
    sameSite: "none", // Allows cookies to be sent across localhost origins
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}

async function loginUser(req, res) {
  const { name, email, password } = req.body;

  const user = await userModel
    .findOne({
      $or: [{ name }, { email }],
    })
    .select("+password");

  if (!user || !user.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
    httpOnly: true, // Prevents client-side JS from reading the cookie (XSS protection)
    secure: true, // Set to true ONLY in production (requires HTTPS)
    sameSite: "none", // Allows cookies to be sent across localhost origins
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  res.status(200).json({
    message: "User Logged in successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
}

module.exports = { registerUser, loginUser, logoutUser };
