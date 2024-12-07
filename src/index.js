const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;

const routers = require("./routes");
const auth = require("./middleware/auth");

const config = require("./config/config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

//temp
const User = require("../models/user.model");
const Note = require("../models/note.model");
const tokenUtils = require("./utils/token.util");

app.use(express.json());
app.use(morgan("combined"));
app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routers);

app.get("/", (req, res) => {
  res.send({
    message: "Hallo 👋",
    status: "Server ready 🚀",
  });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({ error: true, message: "Name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res
      .status(400)
      .json({ error: true, message: "Email already exists" });
  }

  const user = new User({ name, email, password });

  await user.save();

  const token = await tokenUtils.encode(user);

  return res.status(200).json({
    error: false,
    user,
    token,
    message: "User registered successfully",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ error: true, message: "User not found" });
  }

  if (userInfo.email === email) {
    const token = await tokenUtils.encode(userInfo);

    return res.json({
      error: false,
      email,
      token,
      message: "User logged in successfully",
    });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "Invalid username or password" });
  }
});

app.post("/add-note", auth, async (req, res) => {
  const { title, content } = req.body;
  const { user_id } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Note({ title, content, userId: user_id });

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note saved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server error" });
  }

  //debug

  // try {
  //   // Log and return req.user for debugging purposes
  //   console.log("Decoded user from token:", req.user);
  //   return res.status(500).json({
  //     error: true,
  //     message: "Debugging req.user",
  //     user: req.user,
  //   });
  // } catch (error) {
  //   return res
  //     .status(500)
  //     .json({ error: true, message: "Internal Server Error" });
  // }
});

app.post("/edit-note/:noteId", auth, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, isPinned } = req.body;
  const { user_id } = req.user;

  if (!title && !content) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user_id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) {
      note.title = title;
    }
    if (content) {
      note.content = content;
    }
    if (isPinned) {
      note.isPinned = isPinned;
    }

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

app.get("/get-all-notes", auth, async (req, res) => {
  const { user_id } = req.user;

  try {
    const notes = await Note.find({ userId: user_id }).sort({ isPinned: -1 });

    return res.json({
      error: false,
      notes,
      message: "Notes retrieved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

app.delete("/delete/:noteId", auth, async (req, res) => {
  const noteId = req.params.noteId;
  const { user_id } = req.user;

  try {
    const note = await Note.findOneAndDelete({ _id: noteId, userId: user_id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    await Note.deleteOne({ _id: noteId, userId: user_id });

    return res.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

app.put("/pin-note/:noteId", auth, async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user_id } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user_id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (isPinned) {
      note.isPinned = isPinned || false;
    }

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server ready listening on http://localhost:${port}`);
});
