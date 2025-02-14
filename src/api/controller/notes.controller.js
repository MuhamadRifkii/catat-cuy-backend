const db = require("../../models");
const { decrypt, encrypt } = require("../../utils/encryption");
const Note = db.notes;

const getNotes = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const notes = await Note.findAll({
      where: { userId },
      order: [
        ["isPinned", "DESC"],
        ["createdAt", "DESC"],
      ],
    });

    const decryptedNotes = notes.map((note) => {
      const decryptedContent = decrypt(note.iv, note.content);
      return { ...note.toJSON(), content: decryptedContent };
    });

    return res.json({
      error: false,
      userId,
      notes: decryptedNotes,
      message: "Notes retrieved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const addNote = async (req, res) => {
  const { title, content } = req.body;
  const { id: userId } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const { iv, encryptedData } = encrypt(content);
    const note = await Note.create({
      title,
      content: encryptedData,
      iv,
      userId,
    });

    return res.json({
      error: false,
      userId,
      note,
      message: "Note saved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server error" });
  }
};

const editNote = async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, isPinned } = req.body;
  const { id: userId } = req.user;

  if (!title && !content) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  try {
    const note = await Note.findOne({
      where: { id: noteId, userId },
    });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) {
      note.title = title;
    }
    if (content) {
      const { iv, encryptedData } = encrypt(content);
      note.content = encryptedData;
      note.iv = iv;
    }
    if (isPinned) {
      note.isPinned = isPinned;
    }

    await note.save();

    return res.json({
      error: false,
      userId,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const pinNote = async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { id: userId } = req.user;

  try {
    const note = await Note.findOne({
      where: { id: noteId, userId },
    });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      userId,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const deleteNote = async (req, res) => {
  const noteId = req.params.noteId;
  const { id: userId } = req.user;

  try {
    const note = await Note.findOne({
      where: { id: noteId, userId },
    });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    await note.destroy();

    return res.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = { getNotes, addNote, editNote, pinNote, deleteNote };
