const conf = require('./std/conf');

const { MongoClient } = require('mongodb');


const mngConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

exports.init = async() => {
    try {
        const client = new MongoClient(conf.db.uri, mngConfig);

        await client.connect();
        
        let db = client.db(conf.db.dbName);
        exports.collection = await db.collection(conf.db.collection);
    } catch(err) {
        throw new Error(err);
    }

}