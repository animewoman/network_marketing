const conf = require('./std/conf');

const { MongoClient } = require('mongodb');


const mngConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

exports.init = async () => {
    try {
        const client = new MongoClient(conf.db.uri, mngConfig);

        await client.connect();

        let db = client.db(conf.db.dbName);

        conf.db.collections.forEach(async (coll) => {
            exports[coll] = await db.collection(coll);
        })
        console.log('Database is configured and connected to the server...');
    } catch (err) {
        throw new Error(err);
    }

}