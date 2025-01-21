const router = require("express").Router();

const auth = require("../../middleware/auth");
const SaranController = require("../controller/saran.controller");

router.get("/get-all-notes", auth, SaranController.getNotes);
router.post("/add-note", auth, SaranController.addNote);
router.put("/edit-note/:noteId", auth, SaranController.editNote);
router.delete("/delete/:noteId", auth, SaranController.deleteNote);

module.exports = router;
