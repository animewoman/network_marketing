const { users, tokens } = require('./connect-db');
const { isNull, getToken } = require('./helper');
const { auth } = require('./std/conf');
const User = require('./schemas/userSchema');

const jwt = require('jsonwebtoken');

exports.hello = async function (req, res) {
    console.log('I am here');
    res.send('Hello world');
}

exports.createUser = async function (req, res) {
    let status = 200;
    try {
        const userExists = await users.findOne({
            login: req.body.login
        });

        if (!isNull(userExists)) return res.status(400).send({ message: 'Такой пользователь уже существует' });

        const newUser = new User(req.body);

        await users.insertOne(newUser);
    } catch (err) {
        console.error(err);
        status = 500;
    }

    return status === 200 ? res.status(status).send({ message: 'Пользователь успешно добавлен' }) :
        res.status(status).send({ message: 'Серверная ошибка ' });
}

exports.login = async function (req, res) {
    try {
        const { login, password } = req.body;

        const isValidUser = await users.findOne({
            login,
            password
        });
        if (isNull(isValidUser)) return res.status(404).send({ message: 'Неправильный логин или пароль' });

        const newTokens = createTokens(isValidUser.login);
        await tokens.insertOne({ refreshToken: newTokens.refreshToken });

        res.status(200).send({ newTokens });
    } catch (err) {
        console.log(err);
        res.status(500).send('Серверная ошибка')
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

        const newTokens = createTokens(req.user.login);

        await tokens.insertOne({ refreshToken: newTokens.refreshToken });

        res.status(200).send({ newTokens });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}


const createTokens = (login) => {
    const accessToken = jwt.sign({ login }, auth.access, { expiresIn: auth.accessExpires });
    const refreshToken = jwt.sign({ login }, auth.refresh, { expiresIn: auth.refreshExpires });

    return {
        accessToken,
        refreshToken
    }
}