process.env.NODE_ENV = 'test';

var chai = require('chai'),
rgx = require('../regexps.js');
should = chai.should();

describe('REGEXPs username', ()=>{
   describe('Incorrect username', ()=>{
   	describe('Invalid character', ()=>{
	  it('gjkk>jk0jk',(done)=>{
	     	rgx.correctUsername('gjkk>jk0jk').should.equal(false);
		    done();
	  });
	  it('}}}io{',(done)=>{
	     	rgx.correctUsername('}}}io{').should.equal(false);
		    done();
	  });
	 });
   	describe('Invalid length', ()=>{
	  it('9i',(done)=>{
	     	rgx.correctUsername('9i').should.equal(false);
		    done();
	  });
	  it('blablasssssstytytibnvy',(done)=>{
	     	rgx.correctUsername('blablasssssstytytibnvy').should.equal(false);
		    done();
	  });
	});
   });
   describe('Correct username', ()=>{
   	  it('User',(done)=>{
	     	rgx.correctUsername('User').should.equal(true);
		    done();
	  });
	  it('User9',(done)=>{
	     	rgx.correctUsername('User').should.equal(true);
		    done();
	  });
   });
});