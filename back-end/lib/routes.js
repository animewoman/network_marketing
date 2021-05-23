const { collection } = require('./connect-db');
const { isNull } = require('./helper');
exports.hello = async function (req, res) {
    console.log('I am here');
    res.send('Hello world');
}

exports.createUser = async function (req, res) {
    let status = 200;
    try {
        const userExists = await collection.findOne({
            login: req.body.login
        });
        if (!isNull(userExists)) return res.status(400).send({ message: 'user exists' });

        await collection.insertOne({
            login: req.body.login,
            password: req.body.password
        });
    } catch (err) {
        console.error(err);
        status = 500;
    }

    return status === 200 ? res.status(status).send({ message: 'Success' }) :
        res.status(status).send({ message: 'Internal error' });
}

exports.login = async function (req, res) {
    const { login, password } = req.body;
    const isValidUser = await collection.findOne({
        login,
        password
    });
    if (isNull(isValidUser)) return res.status(404).send({ message: 'Wrong credentials' });
    return res.sendStatus(200);
}