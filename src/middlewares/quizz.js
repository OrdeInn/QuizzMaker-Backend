function verifyNewQuizz(req, res, next) {
    console.log('Request Verified!');
    next();
}

module.exports = {
    verifyNewQuizz: verifyNewQuizz
}