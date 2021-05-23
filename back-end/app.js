const conf = require('./lib/std/conf');
const db = require('./lib/connect-db');
const restApi = require('./lib/std/restApi');

process.on('uncaughtException', uncaughtHandler);
process.on('SIGINT', cleanup);
process.on('SIGUSR1', cleanup);
process.on('SIGUSR2', cleanup);

(async() => {
    try {
        await conf.init();
        await restApi.init();
        await db.init();
        console.log('System ready...');
    } catch(err) {
        console.error(`Ошибка при инициализации сервиса ${err.stack || err}`);
    }
})();



function cleanup() {
    try {
        console.log('\nВыполняется остановка микросервиса.....');
    } catch(err) {
        console.error(err.stack || err);
    }

    setTimeout(() => {
        process.exit(1);
    }, 1000);
}

function uncaughtHandler(err) {
    console.log(`Необработанная ошибка ${err.stack || err}`);
}