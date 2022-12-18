const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

const userRouter = require('./src/routes/UserRoutes');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/user', userRouter);

app.get('/', (req,res) => {
    res.send({ message: 'Hello World!'} );
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});