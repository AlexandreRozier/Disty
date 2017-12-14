var express = require('express')
var app = express()
var mongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser')
var _client;

const connectToDb = dbName => new Promise((resolve,reject) => {
    mongoClient.connect("mongodb://localhost:27017")
    .then(client => {
        _client = client
        resolve(client.db(dbName));
    })
    .catch(err => reject(err))
})



const create = dbName => new Promise((resolve, reject) => {
        
    connectToDb(dbName)
        .then(db => {

            // Routes definition
            app.get('/', (req, res) => res.send('Hello World!'))
            app.use("/usr", require("./controllers/usr")(db))
            

            // Start the application after the database connection is ready
            app.listen(3000, () => console.log('App listening on port 3000'))
            resolve(app)
        })
        .catch(err => reject(err))
})

const getDB = (dbName) => _client.db(dbName)

const closeDB = () => _client.close();

const destroy = () => {
    closeDB();
}


// Promise handling connection to the server 
module.exports = {
        getDB,
        closeDB,
        destroy,
        create,
        connectToDb
}

