require('dotenv').config();
const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const User = require("./Models/user.model");
const Note = require("./Models/note.model");

const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");


app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, resp) => {
  resp.json({ data: "Hello" });
});

//Create Account

app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full name is quired" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email  is quired" });
  }

  if (!password) {
    return res.status(400).json({ error: true, message: "Password is quired" });
  }

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({
      error: true,
      message: "User Already exist",
    });
  }
  const user = new User({
    fullName,
    email,
    password,
  });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3600m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successfull",
  });
});

app.post("/login", async (req, resp) => {
  const { email, password } = req.body;
  if (!email) {
    return resp.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return resp.status(400).json({ message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return resp.status(400).json({ message: "User not found" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000",
    });
    return resp.json({
      error: false,
      message: "Login Succesful",
      email,
      accessToken,
    });
  } else {
    return resp.status(400).json({
      error: true,
      message: "Invalid Credentialist",
    });
  }
});

app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;


    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required" });
    }

    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required" });
    }

    const user = req.user;
    if (!user || !user.id) { // Check for user.id instead of user._id
        return res.status(400).json({ error: true, message: "User ID is required" });
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user.id, // Use user.id here
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successfully",
        });
    } catch (error) {
        console.error("Error adding note:", error);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});





app.listen(8000);

module.exports = app;
