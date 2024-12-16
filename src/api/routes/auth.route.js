const router = require("express").Router();

const auth = require("../../middleware/auth");
const AuthController = require("../controller/auth.controller");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/request-password-reset", AuthController.requestPasswordReset);
router.post("/reset-password", AuthController.resetPassword);
router.get("/get-user", auth, AuthController.getUserInfo);

module.exports = router;
