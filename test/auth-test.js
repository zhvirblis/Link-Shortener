process.env.NODE_ENV = 'test';

var chai = require('chai'),
chaiHttp = require('chai-http'),
server = require('../app'),
should = chai.should();

chai.use(chaiHttp);

//LOGIN and PASSWORD for USER

var login='UserTest';
var email='user@test.com';
var password='89787hjvbb';

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
			res.body.should.be.eql({"status":"ok","username":login,"email":email});
			done();
		});
	});
});

describe('POST sign up', ()=>{
	it('Failed registration(Empty login, email and password)', (done)=>{
		chai.request(server)
		.post('/signup')
		.end((err, res)=>{
			res.should.have.status(200);
			res.body.status.should.be.eql('nonreg');
			res.body.message.should.be.eql('Empty login');
			done();
		});
	});
	it('Failed registration(Empty login)', (done)=>{
		chai.request(server)
		.post('/signup')
		.send({password:'jjk',email:'yuyu@ui.com'})
		.end((err, res)=>{
			res.should.have.status(200);
			res.body.status.should.be.eql('nonreg');
			res.body.message.should.be.eql('Empty login');
			done();
		});
	});
	it('Failed registration(Empty email)', (done)=>{
		chai.request(server)
		.post('/signup')
		.send({password:'jjk',username:'yuyu'})
		.end((err, res)=>{
			res.should.have.status(200);
			res.body.status.should.be.eql('nonreg');
			res.body.message.should.be.eql('Empty email');
			done();
		});
	});
	it('Failed registration(Empty password)', (done)=>{
		chai.request(server)
		.post('/signup')
		.send({username:'jjk',email:'yuyu@ui.com'})
		.end((err, res)=>{
			res.should.have.status(200);
			res.body.status.should.be.eql('nonreg');
			res.body.message.should.be.eql('Empty password');
			done();
		});
	});
	it('Failed registration(User already exists)', (done)=>{
		chai.request(server)
		.post('/signup')
		.send({username:login, email:'yuyu@ui.com', password:password})
		.end((err, res)=>{
			res.should.have.status(200);
			res.body.status.should.be.eql('nonreg');
			res.body.message.should.be.eql('User Already Exists');
			done();
		});
	});
	it('Failed registration(Invalid username)', (done)=>{
		chai.request(server)
		.post('/signup')
		.send({username:'kokih>', email:'yuyu@ui.com', password:password})
		.end((err, res)=>{
			res.should.have.status(200);
			res.body.status.should.be.eql('nonreg');
			res.body.message.should.be.eql('Invalid username');
			done();
		});
	});
	it('Success registration', (done)=>{
		chai.request(server)
		.post('/signup')
		.send({username:'kokih', email:'yuyu@ui.com', password:password})
		.end((err, res)=>{
			res.should.have.status(200);
			res.body.should.be.eql({"status":"ok","username":'kokih',"email":'yuyu@ui.com'});
			done();
		});
	});
});

