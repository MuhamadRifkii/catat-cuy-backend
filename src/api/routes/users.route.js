const router = require('express').Router();

const UsersController = require('../controller/user.controller');
const AuthMiddle= require('../../middleware/auth');

router.use(AuthMiddle)
router.get('/', UsersController.getUsers);

module.exports = router;