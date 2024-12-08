const router = require("express").Router();

const auth = require("../../middleware/auth");
const NotesController = require("../controller/notes.controller");

router.get("/get-all-notes", auth, NotesController.getNotes);
router.post("/add-note", NotesController.addNote);
router.post("/edit-note/:noteId", NotesController.editNote);
router.put("/pin-note/:noteId", NotesController.pinNote);
router.delete("/delete/:noteId", NotesController.deleteNote);

module.exports = router;
