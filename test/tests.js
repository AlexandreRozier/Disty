const request = require('supertest');
const should = require('should');
const MongoClient = require('mongodb').MongoClient;
const server = require('../server');
const db_test_name = "disty-test"
describe('Database related tests',() => {
  it('Tests db connection', () => {

    return server.connectToDatabase(db_test_name)
      .catch((err) => should.fail(err))
  })
})


describe('Users controller', () => {

  var srv;
  var user_stub = { name:'foo', ip:'168.100.100.100' }
  var user_id;

  before(() => 
     server.createServer(db_test_name)
      .then( new_server => srv = new_server )
  );

  it('Inserts a new user', () => 
    
    request(srv)
      .post('/usr')
      .send(user_stub)
      .set('accept', 'json')  
      .expect(200)
      .then(res => {user_id = res.body.id; console.log(user_id)})
  );

  it('Gets the inserted user', () => 
    request(srv)
      .get(`/usr/${user_id}`)
      .expect(200)

  )


});

