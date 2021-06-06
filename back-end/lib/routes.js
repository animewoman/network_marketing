const { users, tokens } = require('./connect-db');
const { isNull, getToken, isAdmin } = require('./helper');
const { auth } = require('./std/conf');
const User = require('./schemas/userSchema');


const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');


exports.getUserId = async function (req, res) {
    try {
        console.log(req.query);
        // const user = await findById(users, req.query._id);
        const user = await users.findOne({ login: req.query.login }, {
            projection: excludeUnnessary()
        });
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.deleteUser = async function (req, res) {
    try {
        await users.deleteOne({ _id: ObjectID(req.body._id) });
    } catch (err) {
        res.sendStatus(500);
    }

    res.sendStatus(200);
}

exports.createUser = async function (req, res) {
    try {
        console.log('has requested: ', req.body);
        const userExists = await users.findOne({
            login: req.body.login
        });

        if (!isNull(userExists)) return res.status(400).send({ message: 'Пользователь с таким логином уже существует' });
        let newUser = new User(req.body);

        if (newUser.parent) {
            let itBe = await newUser.getParent(users);
            if (itBe === null) return res.status(400).send({ message: "Такого спонсора нет" });
            newUser.parent = itBe;
        }

        const user = await users.insertOne(newUser);

        res.status(201).send(user.ops[0]);
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
        if (isNull(isValidUser)) return res.status(400).send({ message: 'Неправильный логин или пароль' });

        const newTokens = isValidUser.isAdmin ? createTokens(isValidUser.login, 1) : createTokens(isValidUser.login);
        await tokens.insertOne({ refreshToken: newTokens.refreshToken });

        const resp = {
            user: {
                login: isValidUser.login,
                isAdmin: isValidUser.isAdmin
            },
            tokens: newTokens
        };
        res.status(200).send(resp);
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


exports.getUsers = async function (req, res) {
    try {
        const allUsers = await users.find({
            isAdmin: {
                $ne: true
            }
        }, {
            projection: excludeUnnessary()
        }).toArray();

        console.log(allUsers);
        res.status(200).send({ users: allUsers });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}

exports.updateUser = async function (req, res) {
    let data = Object.assign({}, req.body);
    delete data._id;

    try {
        users.updateOne({ _id: ObjectID(req.body._id) }, {
            $set: {
                score: data.score
            }
        }).then((obj) => {
            obj.result.ok ? res.sendStatus(200) : res.sendStatus(400);
        }).catch((err) => {
            res.status(400).send(err);
        })
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

exports.sendMoney = async function (req, res) {
    try {
        await users.update({
            login: req.body.login
        }, {
            $inc: {
                score: req.body.score
            }
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
    res.sendStatus(200);
}

const findById = async (collection, id) => {
    try {
        return await collection.findOne({ _id: ObjectID(id) }, {
            projection: excludeUnnessary()
        });
    } catch (err) {
        throw new Error(err);
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
        // _id: 0,
        password: 0,
        isAdmin: 0,

    }
}


