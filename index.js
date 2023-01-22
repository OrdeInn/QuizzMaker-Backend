const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const allowedOrigins = ['http://localhost:3000'];

const app = express();
const port = process.env.PORT || 8080;

const userRouter = require('./src/routes/UserRoutes');
const quizzRouter = require('./src/routes/QuizzRoutes');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins[0],
  credentials: true
}));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/user', userRouter);
app.use('/quizz', quizzRouter);

app.get('/', (req,res) => {
    res.send({ message: 'Hello World!'} );
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});