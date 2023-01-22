const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../configs/auth.configs");
const respMessages = require("../configs/resp.messages");
const UserService = require('../services/UserService');

async function signUp(req, res, next) {
    const newUserRequest = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    };
    
    const serviceResult = await UserService.createNewUser(newUserRequest);
    console.log(serviceResult);
    if (serviceResult.error) {
        res.status(500).send({ message: serviceResult.errorMsg });
        return;
    }

    res.send(serviceResult.userObj);
}

async function signin(req, res, next) {
    const userEmail = req.body.email;
    
    const serviceResult = await UserService.findByEmail(userEmail);
    const user = serviceResult.userObj;

    if (serviceResult.error) {
        res.status(500).send({ message: serviceResult.errorMsg, generalMessage: respMessages.generalError});
        return;
    }

    if (!user) {
        res.status(404).send({ message: `${respMessages.credentials.userNotFound} ${userEmail}`, generalMessage: respMessages.generalLoginError});
        return;
    }

    let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );

    if (!passwordIsValid) {
        res.status(401).send({ accessToken: null, message: respMessages.credentials.invalidPassword, generalMessage: respMessages.generalLoginError});
        return;
    }

    let token = jwt.sign({ id: user.id }, config.secret, {expiresIn: "1h"});
    
    const responseHeaders = {
        "Content-Type": "application/json",
        "set-cookie": [
          `accessToken=${token}; Path=/; HttpOnly;`
        ],
    };
    
    res .status(200)
        .cookie("accessToken", config.bearerString + token, {
            expires: new Date(Date.now() + 3600), 
            httpOnly: true 
        })
        .send({
            error: false
        });
}

async function getUser(req, res, next) {
    const userId = req.userId;
    const serviceResult = await UserService.getUserById(userId);
    const user = serviceResult.userObj;

    if (serviceResult.error) {
        res.status(500).send({ message: serviceResult.errorMsg });
        return;
    }

    if (!user) {
        res.status(404).send({ message: `${respMessages.credentials.userNotFound} ${userId}`});
        return;
    }

    res.status(200).send({
        user: user
    });
}

module.exports = {
    signUp: signUp,
    signin: signin,
    getUser: getUser
}