const request = require('supertest');
const should = require('should');
const mongoClient = require('mongodb').MongoClient;
const server = require('../server');
const db_test_name = "disty-test"
const stubs = require('./stubs')

describe('Database related tests',() => {
  it('Tests db connection', () => 

    server.connectToDb(db_test_name)
      .catch((err) => should.fail(err))
  )

  after(() => server.closeDB())
})


describe('Tests server', () => {
  var srv;

  before(() => 
    server.create(db_test_name)
      .then( new_server => srv = new_server )
  );

  /** Users controller test**/
  describe('Users controller', () => {

    var user_id;

    after(() => {
      server.getDB(db_test_name).collection('users').drop()
    })

    it('Inserts a new user', () => 
      
      request(srv)
        .post('/usr')
        .send(stubs.user_stub)
        .set('accept', 'json')  
        .expect(200)
        .then(res => user_id = res.body.id)
    );

    it('Gets the inserted user', () => 
      request(srv)
        .get(`/usr/${user_id}`)
        .expect(200)
    )


  });
})
