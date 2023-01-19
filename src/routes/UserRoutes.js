const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthMiddlewares = require('../middlewares/auth');

router.post('/signup', AuthMiddlewares.verifyCredentials, AuthMiddlewares.verifySignupRequest, UserController.signUp);
router.post('/signin', AuthMiddlewares.verifyCredentials, UserController.signin);

module.exports = router;
