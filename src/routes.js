const router = require("express").Router();

const authRoute = require("./api/routes/auth.route");
const notesRoute = require("./api/routes/notes.route");

// route list
router.use("/api/v1/auth", authRoute);
router.use("/api/v1/notes", notesRoute);

module.exports = router;
