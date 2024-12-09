const router = require("express").Router();

const auth = require("../../../middleware/auth");
const AuthController = require("../../controller/v2/auth.controller");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/get-user", auth, AuthController.getUserInfo);

module.exports = router;
