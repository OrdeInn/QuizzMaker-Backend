const { request } = require("express");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.configs");
const respMessages = require("../configs/resp.messages");
const UserService = require('../services/UserService');

const verifyCredentials = (req, res, next) => {
    if (!req.body.email) {
        res.status(400).send({ message: respMessages.credentials.emptyEmail });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({ message: respMessages.credentials.emptyPassword });
        return;
    }

    next();
}

const verifySignupRequest = async (req, res, next) => {
    if (req.body.password.length < 8) {
        res.status(400).send({ message: respMessages.credentials.shortPassword });
        return;
    }

    try {
        const serviceResponse = await UserService.findByEmail(req.body.email);

        if (serviceResponse.error) {
            res.status(500).send({ message: respMessages.generalError });
            
        } else if (serviceResponse.userObj) {
            res.status(400).send({ message: respMessages.emailInUse });
        }
    } catch (err) {
        res.status(500).send({ message: respMessages.generalError });
    }
    
    next();
};

const verifyToken = (req, res, next) => {
    let authToken = req.cookies.accessToken;
    let token;

    if (authToken && authToken.startsWith(config.bearerString)){
        token = authToken.replace(config.bearerString, "");
    } else {
        res.status(403).send({ message: respMessages.missingToken });
        return;
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(401).send({ message: respMessages.unauthorized });
            return;
        }
        req.userId = decoded.id;

        next();
    });
};

module.exports = {
    verifyCredentials: verifyCredentials,
    verifyToken: verifyToken,
    verifySignupRequest: verifySignupRequest
}