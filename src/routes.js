const router = require("express").Router();

const authRoute = require("./api/routes/auth.route");
const notesRoute = require("./api/routes/notes.route");
const saranRoute = require("./api/routes/saran.route");

router.use("/api/v2/auth", authRoute);
router.use("/api/v2/notes", notesRoute);
router.use("/api/v2/saran", saranRoute);

module.exports = router;
