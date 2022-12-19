const jwt = require("jsonwebtoken");
const config = require("../configs/auth.configs");
const UserService = require('../services/UserService');

const verifySignupRequest = async (req, res, next) => {
    if (!req.body.email) {
        res.status(400).send({ message: "Email cannot be empty!" });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({ message: "Password cannot be empty!" });
        return;
    }

    if (req.body.password.length < 8) {
        res.status(400).send({ message: "Password should be at least 8 characters!" });
        return;
    }

    try {
        const serviceResponse = await UserService.findByEmail(req.body.email);

        if (serviceResponse.error) {
            res.status(500).send({ message: "Something went wrong!" });
            
        } else if (serviceResponse.userObj) {
            res.status(400).send({ message: "This email is already in use!" });
        }
    } catch (err) {
        res.status(500).send({ message: "Something went wrong!" });
    }
    
    next();
};

const verifyToken = (req, res, next) => {
    let authHeader = req.headers["authorization"];
    let token;

    if (authHeader && authHeader.startsWith(config.bearerString)){

        token = authHeader.replace(config.bearerString, "");
    } else {
        res.status(403).send({ message: "Auth token is missing!" });
        return;
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(401).send({ message: "Unauthorized!" });
            return;
        }
        req.userId = decoded.id;

        next();
    });
};

module.exports = {
    verifyToken: verifyToken,
    verifySignupRequest: verifySignupRequest
}