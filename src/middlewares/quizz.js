function verifyNewQuizz(req, res, next) {
    if (!req.body.title) {
        res.status(400).send({ message:`Title cannot be empty!` });
        return;
    }
    const questions = req.body.questions;

    if (questions.length < 1) {
        res.status(400).send({ message:`There should be at least 1 question`});
        return;
    }
    let areQuestionsValid = true;

    for (let i = 0; i < questions.length; i++) {
        let q = questions[i];
        
        if (!q.question) {
            res.status(400).send({ message:`Question cannot be empty!`});
            areQuestionsValid = false;
            break;
        }

        if (!q.options || Object.keys(q.options).length < 1 || Object.keys(q.options).length > 5) {
            res.status(400).send({ message:`Number of options should be between 1-5.`});
            areQuestionsValid = false;
            break;
        }

        for (let opt in q.options) {
            if (!q.options[opt]) {
                res.status(400).send({ message:`Option cannot be empty!`});
                areQuestionsValid = false;
                break;
            }
        }

        if (!areQuestionsValid) break;
    }

    if (!areQuestionsValid) {
        return;
    }

    next();
}

module.exports = {
    verifyNewQuizz: verifyNewQuizz
}