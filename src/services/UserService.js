'use strict'

const { PrismaClient } = require('@prisma/client');

function UserService () {
    const prisma = new PrismaClient();

    this.createNewUser = async function (newUserRequest) {
        const serviceResult = {
            error: false
        };
                
        try {
            const userDB = await prisma.users.create({
                data: {
                    email: newUserRequest.email,
                    password: newUserRequest.password
                }
            });

            if (userDB) {
                serviceResult.userObj = userDB;
            }
        } catch (err) {
            serviceResult.error = true;
            serviceResult.errorMsg = `Error while creating User entity: ${err.message}`;
        }

        return serviceResult;
    };

    this.findByEmail = async function (userEmail) {
        const serviceResult = {
            error: false
        };

        try {
            serviceResult.userObj = await prisma.users.findUnique({
                where: {
                  email: userEmail,
                },
            });
        } catch (err) {
            serviceResult.error = true;
            serviceResult.errorMsg = `Error while getting user: ${userEmail}. ${err.message}`;
        }

        return serviceResult;
    }
}

module.exports = new UserService();