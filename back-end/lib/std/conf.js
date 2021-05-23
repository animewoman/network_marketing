const fs = require('fs');
const path = require('path');
const json5 = require('json5');

const readFolder = path.resolve('configs');

exports.init = async function() {
    return new Promise (async(resolve, reject) => {
        fs.readdir(readFolder, (err, files) => {
            if(err) {
                reject(err);
            }
            files.forEach((file) => {
                const fileObj = json5.parse(fs.readFileSync(readFolder + '/' + file, 'utf8'));
                const fileName = getName(file);
                exports[fileName] = fileObj;
            });
            resolve();
        });
    })
};


const getName = (file) => file.split('.')[0];