let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../app/server')

let should = chai.should()

chai.use(chaiHttp)

//let server = require('../app/server')
describe('/GET brands', () => {
  it('it should GET all the brands', done => {
    chai
      .request(server)
      .get('/brands')
      .end((error, response) => {
        response.should.have.status(200)
        response.body.should.be.an('array')
        response.body.length.should.be.eq(5)
        done()
      })
  })
})
describe('Products', () => {
  describe('/GET products', () => {
    it('it should return an error if the query is an empty string', done => {
      chai
        .request(server)
        .get('/products')
        .end((error, response) => {
          response.should.have.status(401)
          response.body.should.be.an('object')
          response.body.should.not.have.property('productName')
          done()
        })
    })
    it('it should return an error if there is no product with the queried productName ', done => {
      chai
        .request(server)
        .get('/products?productName=boo')
        .end((error, response) => {
          response.should.have.status(403)
          response.body.should.be.an('object')
          response.body.should.not.have.property('productName')
          done()
        })
    })
    it('it should GET all the products with the queried ProductName', done => {
      chai
        .request(server)
        .get('/products?productName=Superglasses')
        .end((error, response) => {
          response.should.have.status(200)
          response.body.should.be.an('object')
          response.body.should.have.property('productName')
          done()
        })
    })
  })
})