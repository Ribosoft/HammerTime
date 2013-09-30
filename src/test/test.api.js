var app = require(process.cwd()+'/app').app,
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    async = require('async'),
    test_utils = require('./test_utils'),
    test_data = require('./test_data');
    
var Request = mongoose.model('Request');

describe('API: /requests/', function(){
    var data = test_data.smallSequence;
    it('POST /requests with sequence only', function(done) {
	async.waterfall([
	    test_utils.createRequest(app, data, done),
	    test_utils.requestDBChecker(data, done)
	],
	function(err, done){
	    if(err) done(err);
	    else done();
	});
    });
});


describe('API: /requests/<id>', function(){
    var data = test_data.smallSequence;
    it('GET /requests/<id> gets newly created request', function(done) {
	async.waterfall([
	test_utils.createRequest(app, data, done),
	test_utils.getRequest(app, data, done)
	],
	function(err, done){
	    if(err) done(err);
	    else done();
	});
    });

    it('GET /requests/<id> with unknown id returns error', function(done) {
	async.waterfall([
	    test_utils.createInexistentRequest(app, data, done),
	    test_utils.getInexistentRequest(app, data, done)
	],
	function(err, done){
	    if(err) done(err);
	    else done();
	});
    });

});

