process.env.NODE_ENV = 'test';

var chai = require('chai'),
chaiHttp = require('chai-http'),
server = require('../app')
should = chai.should();

chai.use(chaiHttp);

describe('POST login', ()=>{
	it('Failed authorithation', (done)=>{
		chai.request(server)
		.get('/login')
		.end((err, res)=>{
			res.should.have.status(200);
			res.body.status.should('nonauth');
			done();
		});
	});
});