const conf = require('./conf');
const { authenticateJwt, authenticateAdmin } = require('../middleware');

const express = require('express');
const path = require('path');

exports.init = async function () {
    return new Promise((resolve, reject) => {
        exports.app = express();
        exports.app.use(express.json());
        exports.app.use(express.urlencoded());

        exports.app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', "*");
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.setHeader('Access-Control-Expose-Headers', 'reference-id');
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
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
        endpoints.forEach((endpoint) => {
            const endMiddleware = endpoint.isAdmin ? authenticateAdmin : authenticateJwt;
            endpoint.authenticated ? router[endpoint.method](endpoint.url, endMiddleware, funcs[endpoint.func]) :
                router[endpoint.method](endpoint.url, funcs[endpoint.func]);

            // router[endpoint.method](endpoint.url, funcs[endpoint.func]);

        });
        exports.app.use(router);
    } catch (err) {
        throw new Error(err);
    }
}