const jwt = require('jsonwebtoken');
const conf = require('./std/conf');
const { getToken } = require('./helper');

exports.authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = getToken(authHeader);
        const secret = whichSecret(req);

        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

exports.authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = getToken(authHeader);
        const secret = whichSecret(req);

        jwt.verify(token, secret, (err, user) => {
            if (err || !user.isAdmin) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

const whichSecret = ({ url }) => url !== '/api/auth/refresh-token' ? conf.auth.access : conf.auth.refresh;