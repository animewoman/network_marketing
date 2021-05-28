const { users, tokens } = require('./connect-db');
const { isNull, getToken, isAdmin } = require('./helper');
const { auth } = require('./std/conf');
const User = require('./schemas/userSchema');

const jwt = require('jsonwebtoken');

exports.hello = async function (req, res) {
    console.log('I am here');
    res.send('Hello world');
}

exports.createUser = async function (req, res) {
    try {
        const userExists = await users.findOne({
            login: req.body.login
        });

        if (!isNull(userExists)) return res.status(400).send({ message: 'Такой пользователь уже существует' });

        const newUser = new User(req.body);

        await users.insertOne(newUser);

        res.status(201).send('Пользователь успешно добавлен');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

exports.login = async function (req, res) {
    try {
        const { login, password } = req.body;

        const isValidUser = await users.findOne({
            login,
            password
        });
        if (isNull(isValidUser)) return res.status(404).send({ message: 'Неправильный логин или пароль' });

        const newTokens = isValidUser.isAdmin ? createTokens(isValidUser.login, 1) : createTokens(isValidUser.login);
        await tokens.insertOne({ refreshToken: newTokens.refreshToken });

        res.status(200).send({ newTokens });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

exports.logout = async function (req, res) {
    try {
        const refreshToken = getToken(req.headers.authorization);
        await tokens.deleteOne(refreshToken);
    } catch (err) {
        console.log(err);
    }
    res.sendStatus(200);

}

exports.getProfile = async function (req, res) {
    try {
        const userProfile = await users.findOne({ login: req.user.login });
        if (isNull(userProfile)) return res.status(404).send({ message: "Упс, что-то пошло не так....." });
        res.status(200).send(userProfile);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}


exports.refreshToken = async function (req, res) {
    try {
        const refreshToken = getToken(req.headers.authorization);
        await tokens.deleteOne({ refreshToken });

        const newTokens = req.user.isAdmin ? createTokens(req.user.login, req.user.isAdmin) : createTokens(req.user.login);

        await tokens.insertOne({ refreshToken: newTokens.refreshToken });

        res.status(200).send({ newTokens });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}


exports.adminPage = async function (req, res) {
    try {
        const allUsers = await users.find({
            isAdmin: {
                $ne: true
            }
        }, {
            projection: excludeUnnessary()
        }).toArray();

        res.status(200).send({ users: allUsers });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}


const createTokens = (login, isAdmin = false) => {
    const accessToken = jwt.sign({ login, isAdmin }, auth.access, { expiresIn: auth.accessExpires });
    const refreshToken = jwt.sign({ login, isAdmin }, auth.refresh, { expiresIn: auth.refreshExpires });

    return {
        accessToken,
        refreshToken
    }
}

const excludeUnnessary = () => {
    return {
        _id: 0,
        password: 0,
    }
}


