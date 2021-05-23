const bodyParser = require('body-parser');
const conf = require('./conf');

const express = require('express');
const path = require('path');

exports.init = async function () {
    return new Promise((resolve, reject) => {
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
        try {
            createEndpoints();
        } catch (err) {
            reject(err);
        }
        console.log(`REST API configurations done, Server is working on ip: ${apiHost} port : ${apiPort}`);

        resolve();

    })
};


const createEndpoints = () => {

    let router = express.Router();
    const endpoints = conf.restApi.endpoints;

    try {
        const funcs = require(path.resolve() + '/lib/routes');
        endpoints.forEach((endpoint) => router[endpoint.method](endpoint.url, funcs[endpoint.func]));
        exports.app.use(router);
    } catch (err) {
        throw new Error(err);
    }
}