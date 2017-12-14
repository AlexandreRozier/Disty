var express = require('express')
var app = express()
var mongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser')


const connectToDatabase = (dbName) => new Promise((resolve,reject) => {
    mongoClient.connect("mongodb://localhost:27017")
    .then(db_parent => resolve(db_parent.db(dbName)))
    .catch(err => reject(err))
})
    

const createServer = (dbName) => new Promise((resolve, reject) => {
        
    connectToDatabase(dbName)
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

// Promise handling connection to the server 
module.exports = {
         
        'createServer': createServer,
        'connectToDatabase': connectToDatabase
}