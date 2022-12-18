-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailConfirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quizzes" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "userId" UUID NOT NULL,

    CONSTRAINT "Quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "question" VARCHAR(800) NOT NULL,
    "option1" VARCHAR(800) NOT NULL,
    "option2" VARCHAR(800) NOT NULL,
    "option3" VARCHAR(800) NOT NULL,
    "option4" VARCHAR(800) NOT NULL,
    "option5" VARCHAR(800) NOT NULL,
    "quizzId" UUID NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Quizzes" ADD CONSTRAINT "Quizzes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "Quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
