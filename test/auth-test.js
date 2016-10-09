process.env.NODE_ENV = 'test';

var chai = require('chai'),
chaiHttp = require('chai-http'),
server = require('../app')
should = chai.should();

chai.use(chaiHttp);

//LOGIN and PASSWORD for USER!!!

var login='Yurock';
var password='4567hj';

describe('POST login', ()=>{
	it('Failed authorithation(Empty login and password)', (done)=>{
		chai.request(server)
		.post('/login')
		.end((err, res)=>{
			res.should.have.status(200);
			res.body.status.should.be.eql('nonauth');
			res.body.message.should.be.eql('Empty login');
			done();
		});
	});

	it('Failed authorithation(Empty login)', (done)=>{
		chai.request(server)
		.post('/login')
		.send({password:password})
		.end((err, res)=>{
			res.should.have.status(200);
			res.body.status.should.be.eql('nonauth');
			res.body.message.should.be.eql('Empty login');
			done();
		});
	});

	it('Failed authorithation(Empty password)', (done)=>{
		chai.request(server)
		.post('/login')
		.send({username:login})
		.end((err, res)=>{
			res.should.have.status(200);
			res.body.status.should.be.eql('nonauth');
			res.body.message.should.be.eql('Empty password');
			done();
		});
	});

	it('Failed authorithation(Incorrect username)', (done)=>{
		chai.request(server)
		.post('/login')
		.send({username:'Somename',password:password})
		.end((err, res)=>{
			res.should.have.status(200);
			res.body.status.should.be.eql('nonauth');
			res.body.message.should.be.eql('Incorrect username or password');
			done();
		});
	});

	it('Failed authorithation(Incorrect password)', (done)=>{
		chai.request(server)
		.post('/login')
		.send({username:login,password:'123456789'})
		.end((err, res)=>{
			res.should.have.status(200);
			res.body.status.should.be.eql('nonauth');
			res.body.message.should.be.eql('Incorrect username or password');
			done();
		});
	});

	it('Success authorithation', (done)=>{
		chai.request(server)
		.post('/login')
		.send({username:login,password:password})
		.end((err, res)=>{
			res.should.have.status(200);
			res.body.should.be.eql({"status":"ok","username":"Yurock","email":"yurock333@gmail.com"});
			done();
		});
	});
});

describe('POST signup', ()=>{

});