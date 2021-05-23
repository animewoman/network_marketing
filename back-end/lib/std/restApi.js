const bodyParser = require('body-parser');
const conf = require('./conf');

const express = require('express');

exports.init = async function () {
    return new Promise((resolve) => {
        exports.app = express();
        exports.app.use(bodyParser.urlencoded({ extended: true }));

        exports.app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', "*");
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type,session-token,caller-token,content-length,reference-id,user-login');
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.setHeader('Access-Control-Expose-Headers', 'reference-id');
            if (req.method === 'OPTIONS') {
                res.status(200).send();
            } else {
                next();
            }
        });
        const apiPort = conf.restApi.port || 8080, apiHost = conf.restApi.host || '0.0.0.0';
        exports.app.listen(apiPort, apiHost);
        console.log(`REST API configurations done, Server is working on ip: ${apiHost} port : ${apiPort}`);
        resolve();

    })
};