const { users, tokens, transfers, stages } = require('./connect-db');
const { isNull, getToken, isAdmin } = require('./helper');
const { auth, gameInfo } = require('./std/conf');
const User = require('./schemas/userSchema');


const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');


exports.getUserId = async function (req, res) {
    try {
        const user = await users.findOne({ login: req.query.login }, {
            projection: excludeUnnessary()
        });
        res.status(200).send({
            data: user
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.deleteUser = async function (req, res) {
    console.log('detelte user', req.body);
    try {
        await users.deleteOne({ _id: ObjectID(req.body._id) });
    } catch (err) {
        res.sendStatus(500);
    }

    res.sendStatus(200);
}

exports.createUser = async function (req, res) {
    req.body.login = req.body.login.toLowerCase();
    try {
        const userExists = await users.findOne({
            login: req.body.login
        });

        if (!isNull(userExists)) return res.status(400).send({ message: 'Пользователь с таким логином уже существует' });
        let newUser = new User(req.body);
        let user, itBe, temp;
        if (newUser.parent) {
            itBe = await newUser.getParent(users);
            if (itBe === null) return res.status(400).send({ message: "Такого спонсора нет" });

            temp = await stages.findOne({
                userId: ObjectID(itBe._id),
                stage: 1
            });

            if (temp.left && temp.right) // return res.status(400).send({ message: "Спонсор занят" });
            {
                temp = await findNewParent(temp);
            }
        }


        user = await users.insertOne(newUser);
        user = user.ops[0];


        if (temp) {
            temp.left ? temp.right = user._id : temp.left = user._id;

            await stages.updateOne({
                _id: ObjectID(temp._id)
            }, {
                $set: temp
            });
            await incStage(temp.userId, temp.stage, user.login);

            if (temp.parent) {
                await incStage(temp.parent, temp.stage, temp.login);
                await actualizeCounter(temp.parent, temp.stage);
            }
        }

        if (newUser.parent) await createStageWithParent(user._id, 1, temp);
        else await createStageWithoutParent(user._id, 1);


        res.status(201).send({ data: user });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function findNewParent(stage) {
    try {
        let arr = [stage];
        let size = arr.length;
        for (let i = 0; i < size; i++) {
            for (let j = 1; j < 3; j++) {
                const check = await stages.findOne({
                    order: parseInt(arr[i].order) * 2 + j,
                    stage: arr[i].stage
                });
                if (isNull(check)) return arr[i];

                arr.push(check);
                size += 1;
            }
        }
    } catch (err) {
        throw new Error(err);
    }
}

async function createStageWithoutParent(userId, stage) {
    try {

        const data = await users.findOne({
            _id: ObjectID(userId)
        });
        await stages.insertOne({
            parent: null,
            userId,
            fullName: data.fullName,
            login: data.login,
            phone: data.phone,
            email: data.email,
            region: data.region,
            left: null,
            right: null,
            stage,
            counter: 0,
            order: 0
        })
    } catch (err) {
        throw new Error(err);
    }
}

async function createStageWithParent(userId, stage, parent) {
    try {
        const data = await users.findOne({
            _id: ObjectID(userId)
        });
        await stages.insertOne({
            parent: parent.userId,
            userId,
            fullName: data.fullName,
            login: data.login,
            phone: data.phone,
            email: data.email,
            region: data.region,
            left: null,
            right: null,
            stage,
            counter: 0,
            order: parent.left == userId ? parent.order * 2 + 1 : parent.order * 2 + 2
        });
    } catch (err) {
        throw new Error(err);
    }
}


async function incStage(id, stage, from) {

    try {
        await stages.updateOne({
            userId: ObjectID(id),
            stage: stage
        }, {
            $inc: {
                counter: 1
            }
        });
        await users.updateOne({
            _id: ObjectID(id)
        }, {
            $inc: {
                score: gameInfo.statuses[stage - 1].price
            }
        });

        await transfers.insertOne({
            type: 'bonus',
            quantity: gameInfo.statuses[stage - 1].price,
            from,
            to,
            stage: stage,
            date: new Date()
        });
    } catch (err) {
        throw new Error(err);
    }
}


async function actualizeCounter(parentId, stage) {
    try {
        const updateParent = await stages.findOne({
            userId: ObjectID(parentId),
            stage: stage
        });

        if (updateParent.counter == gameInfo.statuses[updateParent.stage - 1].goal) {
            await users.updateOne({
                _id: ObjectID(parentId)
            }, {
                $set: {
                    status: gameInfo.statuses[updateParent.stage].name
                },
                $inc: {
                    activeStage: 1
                }
            });
            await levelUp(updateParent);
        }
    } catch (err) {
        throw new Error(err);
    }
}

async function levelUp(me) {
    try {
        const stagesQty = await stages.find({
            stage: me.stage + 1
        }).count();

        if (!stagesQty) {
            return await createStageWithoutParent(me.userId, me.stage + 1);
        }

        let newFather = await findStagePar(me);
        if (isNull(newFather)) {
            newFather = await stages.find({
                counter: {
                    $lt: 2
                },
                stage: me.stage + 1
            }).sort({ order: 1 }).limit(1).toArray();

            newFather = newFather[0];
        }


        if (newFather.left) {
            newFather.right = me.userId;
        } else {
            newFather.left = me.userId;
        }
        await stages.updateOne({
            _id: ObjectID(newFather._id)
        }, {
            $set: newFather
        });

        await incStage(newFather.userId, newFather.stage, me.login);
        if (newFather.parent) {
            await incStage(newFather.parent, newFather.stage, newFather.login);
            await actualizeCounter(newFather.parent, newFather.stage);
        }
        await createStageWithParent(me.userId, me.stage + 1, newFather);

    } catch (err) {
        throw new Error(err);
    }

    async function findStagePar(stage) {
        try {
            const meAsUser = await users.findOne({
                _id: ObjectID(stage.userId)
            });

            const dad = await stages.findOne({
                stage: stage.stage + 1,
                login: meAsUser.parent
            });

            if (isNull(dad) || (dad.right && dad.left)) return null;
            return dad;
        } catch (err) {
            throw new Error(err);
        }
    }
}

exports.login = async function (req, res) {
    req.body.login = req.body.login.toLowerCase();
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
            data: {
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

        res.status(200).send({ data: allUsers });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}

exports.updateUser = async function (req, res) {

    let data = Object.assign({}, req.body);
    data.score ? data.score = parseInt(data.score) : null;
    delete data._id;
    try {
        if (data.parent) {
            const parExists = await users.findOne({
                login: data.parent
            });

            if (isNull(parExists)) return res.status(400).send({ message: "Спонсор не найден" });
        }

        users.updateOne({ _id: ObjectID(req.body._id) }, {
            $set: data
        }).then((obj) => {
            obj.result.ok ? res.sendStatus(200) : res.sendStatus(400);
        }).catch((err) => {
            res.status(400).send(err);
        })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

exports.sendMoney = async function (req, res) {
    if (req.body.login === req.user.login) return res.status(400).send({ message: "Сам себе отправляешь деньги" });
    req.body.score = parseFloat(req.body.score);

    try {
        let resp = await users.updateOne({
            login: req.user.login,
            score: {
                $gt: req.body.score
            }
        }, {
            $inc: {
                score: -(req.body.score)
            }
        });

        if (!resp.result.nModified) {
            return res.status(400).send({
                message: "Недостаточно средств"
            });
        }

        await users.updateOne({
            login: req.body.login
        }, {
            $inc: {
                score: req.body.score
            }
        });

        await transfers.insertOne({
            type: "sent",
            from: req.user.login,
            quantity: req.body.score,
            to: req.body.login,
            date: new Date()
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
    res.sendStatus(200);
}

exports.getTransfers = async function (req, res) {
    try {
        const bonus = await transfers.find({ type: 'bonus', })
        const from = await transfers.find({ from: req.body.login }).toArray();
        const to = await transfers.find({ to: req.body.login }).toArray();
        let resp = [];
        from.forEach((element) => {
            resp.push({
                type: "Отправил",
                from: element.to,
                score: element.price
            });
        });
        to.forEach((element) => {
            resp.push({
                type: "Получил",
                from: element.from,
                score: element.price
            });
        });
        return res.status(200).send({
            data: resp
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.getPartners = async function (req, res) {
    req.body.login = req.body.login.toLowerCase();

    try {
        const user = await users.findOne({ login: req.body.login });
        if (isNull(user)) return res.status(400).send({ message: "Такой пользователь не найден" });
        let ans = {};
        for (let curStage = 1; curStage < 9; curStage++) {
            let toPush = await stages.findOne({
                userId: ObjectID(user._id),
                stage: curStage
            });
            ans[curStage] = [];
            if (isNull(toPush)) continue;

            let orders = [parseInt(toPush.order)];
            for (let i = 0; i < 3; i++) {
                orders.push(orders[i] * 2 + 1);
                orders.push(orders[i] * 2 + 2);
            }
            for (let ind = 0; ind < orders.length; ind++) {
                elem = orders[ind];

                let needStage = await stages.findOne({
                    order: parseInt(elem),
                    stage: curStage
                }, {
                    projection: {
                        fullName: 1,
                        login: 1,
                        parent: 1,
                        phone: 1,
                        email: 1,
                        region: 1
                    }
                });
                if (!isNull(needStage)) {
                    const parLogin = await users.findOne({
                        _id: ObjectID(needStage.parent)
                    });

                    if (!isNull(parLogin)) needStage.parent = parLogin.login;

                    ans[curStage].push(needStage);
                }
            }
        }
        res.status(200).send(ans);
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
        // _id: 0,
        isAdmin: 0,

    }
}


