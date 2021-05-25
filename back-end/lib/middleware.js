const jwt = require('jsonwebtoken');
const conf = require('./std/conf');
const { getToken } = require('./helper');

exports.authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = getToken(authHeader);
        let secret = '';
        req.url !== '/api/auth/refresh-token' ? secret = conf.auth.access : secret = conf.auth.refresh;

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