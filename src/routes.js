const router = require("express").Router();

const usersRoute = require("./api/routes/users.route");
const authRoute = require("./api/routes/auth.route");
const notesRoute = require("./api/routes/notes.route");

// route list
router.use("/api/v1/users", usersRoute);
router.use("/api/v1/auth", authRoute);
router.use("/api/v1/notes", notesRoute);

module.exports = router;
