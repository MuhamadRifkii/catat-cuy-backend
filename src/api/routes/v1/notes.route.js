const router = require("express").Router();

const auth = require("../../../middleware/auth");
const NotesController = require("../../controller/v1/notes.controller");

router.get("/get-all-notes", auth, NotesController.getNotes);
router.post("/add-note", auth, NotesController.addNote);
router.post("/edit-note/:noteId", auth, NotesController.editNote);
router.put("/pin-note/:noteId", auth, NotesController.pinNote);
router.delete("/delete/:noteId", auth, NotesController.deleteNote);

module.exports = router;
