const router = require("express").Router();

// mongodb
// const mongoAuthRoute = require("./api/routes/v1/auth.route");
// const mongoNotesRoute = require("./api/routes/v1/notes.route");

// sequelize
const authRoute = require("./api/routes/v2/auth.route");
const notesRoute = require("./api/routes/v2/notes.route");

// route list
// router.use("/api/v1/auth", mongoAuthRoute);
// router.use("/api/v1/notes", mongoNotesRoute);
router.use("/api/v2/auth", authRoute);
router.use("/api/v2/notes", notesRoute);

module.exports = router;
