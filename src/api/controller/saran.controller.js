const db = require("../../models");
const Saran = db.saran;

const getNotes = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const notes = await Saran.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.json({
      error: false,
      userId,
      notes,
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
    const note = await Saran.create({ title, content, userId });

    await note.save();

    return res.json({
      error: false,
      userId,
      note,
      message: "Saran saved successfully",
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

  if (!title && !content && isPinned === undefined) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  try {
    const note = await Saran.findOne({
      where: { id: noteId, userId },
    });

    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Saran not found or you are not authorized to edit this note",
      });
    }

    if (title) {
      note.title = title;
    }
    if (content) {
      note.content = content;
    }
    if (isPinned !== undefined) {
      note.isPinned = isPinned;
    }

    await note.save();

    return res.json({
      error: false,
      userId,
      note,
      message: "Saran updated successfully",
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
    const note = await Saran.findOne({
      where: { id: noteId, userId },
    });

    if (!note) {
      return res.status(404).json({
        error: true,
        message:
          "Saran not found or you are not authorized to delete this note",
      });
    }

    await note.destroy();

    return res.json({
      error: false,
      message: "Saran deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = { getNotes, addNote, editNote, deleteNote };
