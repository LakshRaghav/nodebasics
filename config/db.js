require('dotenv').config({path:"../.env"});
const MongoClient = require('mongodb').MongoClient;
const ServerApiVersion = require('mongodb').ServerApiVersion;
// module.exports  = async function getDb(){
//     const db =  await MongoClient.connect(process.env.MONGO_URI);
//     return db.db(process.env.DB_NAME); 
// }

// module.exports  = async function getempDB(){
//         const db =  await MongoClient.connect(process.env.MONGO_URI);
//             return db.db(process.env.DB2_NAME);
//     }

    module.exports  = {
        getDb: async function(){
                console.log(process.env.MONGO_URI)
                const db =  await MongoClient.connect(process.env.MONGO_URI,{
                    usenewurlparser:true,useUnifiedTopology:true, serverapi: ServerApiVersion.v1});
                return db.db(process.env.DB_NAME); 
            },
        getempDB:async function(){
        const db =  await MongoClient.connect(process.env.MONGO_URI);
            return db.db(process.env.DB2_NAME);
        }
    }