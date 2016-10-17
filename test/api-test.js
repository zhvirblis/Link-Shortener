process.env.NODE_ENV = 'test';

var chai = require('chai'),
chaiHttp = require('chai-http'),
server = require('../app.js'),
should = chai.should();

chai.use(chaiHttp);

//LOGIN and PASSWORD for USER

var login='UserTest';
var password='89787hjvbb';
var email='user@test.com';

describe('API Link test', ()=>{
	describe('Add link', ()=>{
	 it('Failed add, User is not authorized', (done)=>{
		chai.request(server)
		.post('/api/link')
		.end((err, res)=>{
			res.should.have.status(200);
			res.body.status.should.be.eql('nonadd');
			res.body.message.should.be.eql('User is not authorized');
			done();
		});
	 });

	 it('Failed add, empty new url', (done)=>{
		var agent = chai.request.agent(server);
		agent.post('/login')
		.send({username:login,password:password})
		.end((err, res)=>{
			res.should.have.cookie('connect.sid');
			agent.post('/api/link')
			.end((err, res)=>{
				res.body.message.should.be.eql('Empty new url');
				done();
			});
		});
	 });

	 it('Failed add, empty origin url', (done)=>{
		var agent = chai.request.agent(server);
		agent.post('/login')
		.send({username:login,password:password})
		.end((err, res)=>{
			res.should.have.cookie('connect.sid');
			agent.post('/api/link')
			.send({newurl:'3er'})
			.end((err, res)=>{
				res.should.have.status(200);
				res.body.message.should.be.eql('Empty origin url');
				done();
			});
		});
	 });

	 it('Failed add, empty origin url', (done)=>{
		var agent = chai.request.agent(server);
		agent.post('/login')
		.send({username:login,password:password})
		.end((err, res)=>{
			res.should.have.cookie('connect.sid');
			agent.post('/api/link')
			.send({newurl:'3er//',origin:'https://example.com/'})
			.end((err, res)=>{
				res.should.have.status(200);
				res.body.message.should.be.eql('Incorrect new url');
				done();
			});
		});
	 });

	 it('Failed add, empty origin url', (done)=>{
		var agent = chai.request.agent(server);
		agent.post('/login')
		.send({username:login,password:password})
		.end((err, res)=>{
			res.should.have.cookie('connect.sid');
			agent.post('/api/link')
			.send({newurl:'3er',origin:'hzxczom/'})
			.end((err, res)=>{
				res.should.have.status(200);
				res.body.message.should.be.eql('Incorrect origin url');
				done();
			});
		});
	 });
	 it('Successful add link without tags', (done)=>{
		var agent = chai.request.agent(server);
		agent.post('/login')
		.send({username:login,password:password})
		.end((err, res)=>{
			res.should.have.cookie('connect.sid');
			agent.post('/api/link')
			.send({newurl:'3er',origin:'https://example.com/'})
			.end((err, res)=>{
				res.should.have.status(200);
				res.body.should.be.eql({status:'ok', newurl:'3er', origin:'https://example.com/',tags:[]});
				done();
			});
		});
	 });
	 
	 it('Successful add, but tags is not array', (done)=>{
		var agent = chai.request.agent(server);
		agent.post('/login')
		.send({username:login,password:password})
		.end((err, res)=>{
			res.should.have.cookie('connect.sid');
			agent.post('/api/link')
			.send({newurl:'3sa',origin:'https://example.com/', tags:'sdf'})
			.end((err, res)=>{
				res.should.have.status(200);
				res.body.should.be.eql({status:'ok', newurl:'3sa', origin:'https://example.com/',tags:[]});
				done();
			});
		});
	 });

	  it('Successful add with tags', (done)=>{
		var agent = chai.request.agent(server);
		agent.post('/login')
		.send({username:login,password:password})
		.end((err, res)=>{
			res.should.have.cookie('connect.sid');
			agent.post('/api/link')
			.send({newurl:'sa6we',origin:'https://example.com/', tags:['rock','fgd']})
			.end((err, res)=>{
				res.should.have.status(200);
				res.body.should.be.eql({status:'ok', newurl:'sa6we', origin:'https://example.com/',tags:['rock','fgd']});
				done();
			});
		});
	 });

	 it('Link alredy axist', (done)=>{
		var agent = chai.request.agent(server);
		agent.post('/login')
		.send({username:login,password:password})
		.end((err, res)=>{
			res.should.have.cookie('connect.sid');
			agent.post('/api/link')
			.send({newurl:'sa6we',origin:'https://example.com/', tags:['rock','fgd']})
			.end((err, res)=>{
				res.should.have.status(200);
				res.body.should.be.eql({status:'nonadd', message:'Link already exist'});
				done();
			});
		});
	 });

	 it('Error', (done)=>{
		var agent = chai.request.agent(server);
		agent.post('/login')
		.send({username:login,password:password})
		.end((err, res)=>{
			res.should.have.cookie('connect.sid');
			agent.post('/api/link')
			.send({newurl:'sa6w1',origin:'https://example.com/', tags:['rock','fgd',{dfd:'dsf'}]})
			.end((err, res)=>{
				res.should.have.status(200);
				res.body.should.be.eql({status:'err', message:'Link validation failed'});
				done();
			});
		});
	 });
    });
  describe('Delete link', ()=>{
	it('Failed delete, User is not authorized', (done)=>{
		chai.request(server)
		.delete('/api/link/sa6w1')
		.end((err, res)=>{
			res.should.have.status(200);
			res.body.status.should.be.eql('nondel');
			res.body.message.should.be.eql('User is not authorized');
			done();
		});
	});
	it('Failed delete, Incorrect code', (done)=>{
		chai.request(server)
		.delete('/api/link/sa6w1&&*')
		.end((err, res)=>{
			res.should.have.status(200);
			res.body.status.should.be.eql('nondel');
			res.body.message.should.be.eql('Incorect code');
			done();
		});
	});
	it('Successful delete', (done)=>{
		var agent = chai.request.agent(server);
		agent.post('/login')
		.send({username:login,password:password})
		.end((err, res)=>{
			res.should.have.cookie('connect.sid');
			agent.delete('/api/link/sa6w1')
				.end((err, res)=>{
				res.should.have.status(200);
				res.body.status.should.be.eql('ok');
				res.body.message.should.be.eql('Link deleted');
				done();
			});
		});
	});

  });

});