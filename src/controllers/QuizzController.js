const QuizService = require('../services/QuizService');

async function newQuizz(req, res, next) {
    const newQuizRequest = createNewQuizRequest(req);
    const serviceRes = await QuizService.createNewQuizz(newQuizRequest);

    if (serviceRes.error) {
        res.status(500).send({ message:serviceRes.errorMsg });
        return;
    }

    res.status(200).send(serviceRes.quizObj);
}

function createNewQuizRequest(req) {
    const request = {
        userId: req.userId,
        title: req.body.title,
        questions: []
    };

    req.body.questions.forEach(q => {
        let questionRecord = {};
        questionRecord.question = q.question;

        for (let option in q.options) {
            questionRecord[option] = q.options[option];
        }
        let optionKeys = Object.keys(q.options);

        if (optionKeys.length < 5) {
            for (let i = optionKeys.length; i < 5; i++) {
                questionRecord[`option${i + 1}`] = "";
            }
        }

        request.questions.push(questionRecord);
    });

    return request;
}

module.exports = {
    newQuizz: newQuizz
}