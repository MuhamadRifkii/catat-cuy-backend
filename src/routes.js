const router = require("express").Router();

const usersRoute = require("./api/routes/users.route");
const authRoute = require("./api/routes/auth.route");

// route list
router.use("/api/v1/users", usersRoute);
router.use("/api/v1/auth", authRoute);

module.exports = router;
