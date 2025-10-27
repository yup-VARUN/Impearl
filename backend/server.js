import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Marketplace from "./models/Marketplace.js";

dotenv.config();
const app = express();

// ✅ Allow frontend (3000) to reach backend (5000)
app.use(
  cors({
    origin: [
      "https://damp-mummy-97w4r6w6x6ph9pwv-3000.app.github.dev",
      "https://damp-mummy-97w4r6w6x6ph9pwv-5000.app.github.dev",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => res.send("Backend running!"));

app.post("/register", async (req, res) => {
  try {
    console.log("📩 Registration body:", req.body);
    const { name, email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "✅ Registration successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📩 Login body:", req.body);

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "1h" }
    );

    res.json({ message: "✅ Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

app.get("/marketplace", async (req, res) => {
  try {
    const items = await Marketplace.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/marketplace", async (req, res) => {
  try {
    const { title, description, price } = req.body;
    if (!title || !description)
      return res.status(400).json({ message: "Title and description required" });
    const newItem = new Marketplace({ title, description, price });
    await newItem.save();
    res.status(201).json({ message: "✅ Item added to marketplace", item: newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
