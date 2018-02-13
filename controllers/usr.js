var express = require('express')
var bodyParser = require('body-parser')
var ObjectId = require('mongodb').ObjectID;
module.exports = db => {
	
	var app = express()

	// Middlewares definition
	app.use(bodyParser.json())

  	var users = db.collection('users');	

  	app.post('/', (req, res) => {
		users.insertOne(req.body)
		.then(succ => res.json({id:succ.ops[0]._id}) )
		.catch(err => res.sendStatus(500))
	});

	app.get('/:id', (req, res) => {	
		console.log(req.params.id)
		users.findOne({ _id: ObjectId(req.params.id)	 })
		.then( usr => res.json(usr) )
		.catch( err => res.sendStatus(500) )
	});

	return app;
};