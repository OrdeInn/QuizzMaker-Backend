const { PrismaClient } = require('@prisma/client');

function QuizzService() {
    const prisma = new PrismaClient();

    this.createNewQuizz = async function (newQuizzRequest) {
        const serviceResult = {
            error: false
        };

        try {
            const newQuiz = await prisma.quizzes.create({
                data: {
                    user:{
                        connect: {id:newQuizzRequest.userId}
                    },
                    title: newQuizzRequest.title,
                    Questions: {
                        create: newQuizzRequest.questions
                    }
                },
                include: {
                    Questions: true
                }
            });

            if (!newQuiz) {
                serviceResult.error = true;
                serviceResult.errorMsg = `Something went wrong while creating new quiz with user: ${userId}`;
            } else {
                serviceResult.quizObj = newQuiz;
            }
        
        } catch (err) {
            serviceResult.error = true;
            serviceResult.errorMsg = err;
        }

        return serviceResult;
    };
}

module.exports = new QuizzService();