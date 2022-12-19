const express = require('express');
const router = express.Router();
const QuizzController = require('../controllers/QuizzController');
const AuthMiddlewares = require('../middlewares/auth');
const QuizzMiddlewares = require('../middlewares/quizz');

router.post('/new', AuthMiddlewares.verifyToken, QuizzMiddlewares.verifyNewQuizz, QuizzController.newQuizz);

module.exports = router;
