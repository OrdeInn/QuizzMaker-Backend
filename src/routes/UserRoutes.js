const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthMiddlewares = require('../middlewares/auth');

router.post('/signup', AuthMiddlewares.verifySignupRequest, UserController.signUp);
router.post('/signin', UserController.signin);

module.exports = router;
