const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../configs/auth.configs");
const UserService = require('../services/UserService');

async function signUp(req, res, next) {
    const newUserRequest = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    };
    
    const serviceResult = await UserService.createNewUser(newUserRequest);

    if (serviceResult.error) {
        res.status(500).send({ message: serviceResult.errorMsg });
        next();
    }

    res.send(serviceResult.userObj);
}

async function signin(req, res, next) {
    const userEmail = req.body.email;
    
    const serviceResult = await UserService.findByEmail(userEmail);
    const user = serviceResult.userObj;

    if (serviceResult.error) {
        res.status(500).send({ message:serviceResult.errorMsg });
        next();
    }

    if (!user) {
        res.status(404).send({ message: `User cannot found with email: ${userEmail}`});
        next();
    }

    let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );

    if (!passwordIsValid) {
        res.status(401).send({ accessToken: null, message: `Invalid password!`});
        next();
    }

    let token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 86400});
    
    res.status(200).send({
        id: user.id,
        email: user.email,
        accessToken: token
    });

    next();
}

module.exports = {
    signUp: signUp,
    signin: signin
}