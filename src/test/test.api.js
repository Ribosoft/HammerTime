var app = require(process.cwd()+'/app').app,
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    async = require('async'),
    test_utils = require('./test_utils'),
    test_data = require('./test_data');
    
var Request = mongoose.model('Request');

describe('POST: /requests/', function(){
    var data = test_data.smallSequence.request;
    it('POST /requests with sequence only', function(done) {
	async.waterfall([
	    test_utils.createRequest(app, data, done),
	    test_utils.requestChecker(data, done)
	],
	function(err, done){
	    test_utils.errorHandler(err, done);
	    done();
	});
    });
});


describe('GET: /requests/<id>', function(){
    var data = test_data.smallSequence.request;
    it('GET /requests/<id> gets newly created request', function(done) {
	async.waterfall([
	test_utils.createRequest(app, data, done),
	test_utils.getRequest(app, data, done)
	],
	function(err, done){
	    test_utils.errorHandler(err, done);
	    done();
	});
    });

    it('GET /requests/<id> with unknown id returns error', function(done) {
	async.waterfall([
	    test_utils.createInexistentRequest(app, data, done),
	    test_utils.getInexistentRequest(app, data, done)
	],
	function(err, done){
	    test_utils.errorHandler(err, done);
	    done();
	});
    });
});

describe('PUT: /requests/<id>', function(){
    var data = test_data.smallSequence.request;
    var newRequest = test_data.smallSequence.newRequest;
    var results_data = test_data.smallSequence.results;
    var duration = test_data.smallSequence.duration;
    it('PUT /requests/<id> modifies request to new request', function(done) {
	async.waterfall([
	    test_utils.createRequest(app, data, done),
	    test_utils.updateRequest(app, newRequest, done)
	],
	function(err, done){
	    test_utils.errorHandler(err, done);
	    done();
	});
    });

    it('PUT /requests/<id> with unknown id returns 404 error', function(done) {
	async.waterfall([
	    test_utils.createInexistentRequest(app, data, done),
	    test_utils.updateInexistentRequest(app, newRequest, done)
	],
	function(err, done){
	    test_utils.errorHandler(err, done);
	    done();
	});
    });

    it('PUT /requests/<id> with in-processing request returns 405 error', function(done) {
	async.waterfall
	([
	    test_utils.createRequest(app, data, done),
	    test_utils.setRequestProcessed(results_data, done),
	    test_utils.updateProcessedRequest(app, newRequest, done)
	],
	 function(err, done){
	     test_utils.errorHandler(err, done);
	     done();
	 });
    });

    it('PUT /requests/<id> with processed request returns 405 error', function(done) {
	async.waterfall
	([
	    test_utils.createRequest(app, data, done),
	    test_utils.setRequestInProcessing(duration, done),
	    test_utils.updateInProcessingRequest(app, newRequest, done)
	],
	 function(err, done){
	     test_utils.errorHandler(err, done);
	     done();
	 });
    });

    it('PUT /requests/<id> returns 400 when no sequence submitted in new request', function(done) {
	async.waterfall([
	    test_utils.createRequest(app, data, done),
	    test_utils.updateRequestNoSequence(app, newRequest, done),
	],
	function(err, done){
	    test_utils.errorHandler(err, done);
	    done();
	});
    });
     

});


describe('DELETE: /requests/<id>', function(){
    var data = test_data.smallSequence.request;
    var duration = test_data.smallSequence.duration;
    
    it('DELETE /requests/<id> deletes existing non-started request', function(done) {
	async.waterfall([
	    test_utils.createRequest(app, data, done),
	    test_utils.deleteRequest(app, data, done),
	    test_utils.inexistentRequestChecker(data, done)
	],
	function(err, done){
	    test_utils.errorHandler(err, done);
	    done();
	});
    });
    

    it('DELETE /requests/<id> deletes existing non-started request', function(done) {
	async.waterfall([
	    test_utils.createInexistentRequest(app, data, done),
	    test_utils.deleteInexistentRequest(app, data, done),
	    test_utils.inexistentRequestChecker(data, done)
	],
	function(err, done){
	    test_utils.errorHandler(err, done);
	    done();
	});
    });

    it('DELETE /requests/<id> can\'t delete inprocessing request', function(done) {
	async.waterfall([
	    test_utils.createRequest(app, data, done),
	    test_utils.setRequestInProcessing(duration, done),
	    test_utils.deleteInProcessingRequest(app, data, done)
	],
	function(err, done){
	    test_utils.errorHandler(err, done);
	    if(!err) done();
	});
    });
});

describe('GET: /requests/<id>/status', function(){
    var data = test_data.smallSequence.request;
    var duration = test_data.smallSequence.duration;
    var results_data = test_data.smallSequence.results;
    it('GET /requests/<id>/status returns 404 for non-existing request', function(done) {
	async.waterfall([
	    test_utils.createInexistentRequest(app, data, done),
	    test_utils.getInexistentRequestStatus(app, data, done)
	],
	function(err, done){
	    test_utils.errorHandler(err, done);
	    if(!err) done();
	});
    });

    it('GET /requests/<id>/status returns 200, duration and status for processed request', function(done) {
	async.waterfall([
	    test_utils.createRequest(app, data, results_data, done),
	    test_utils.setRequestProcessed(results_data, done),
	    test_utils.getRequestStatus(app, duration, done),
	    test_utils.checkResultsFileExist(results_data, done)
	],
	function(err, done){
	    test_utils.errorHandler(err, done);
	    if(!err) done();
	});
    });

    it('GET /requests/<id>/status returns location of results for processed request', function(done) {
	async.waterfall([
	    test_utils.createRequest(app, data, done),
	    test_utils.setRequestProcessed(results_data, done),
	    test_utils.getRequestStatus(app, duration, done),
	    test_utils.getResults(app, results_data, done)
	],
	function(err, done){
	    test_utils.errorHandler(err, done);
	    if(!err) done();
	});
    });

    it('GET /requests/<id>/status returns 202, status and duration for in-processing request', function(done) {
	async.waterfall([
	    test_utils.createRequest(app, data, done),
	    test_utils.setRequestInProcessing(duration, done),
	    test_utils.getInProcessingRequestStatus(app, duration, done)
	],
	function(err, done){
	    test_utils.errorHandler(err, done);
	    if(!err) done();
	});
    });

        it('GET /requests/<id>/status returns 202, status and duration for in-processing request', function(done) {
	async.waterfall([
	    test_utils.createRequest(app, data, done),
	    test_utils.setRequestInProcessing(duration, done),
	    test_utils.getInProcessingRequestStatusExtra(app, duration, done)
	],
	function(err, done){
	    test_utils.errorHandler(err, done);
	    if(!err) done();
	});
    });
});

// Always keep last
after(function(done){
    try{
	test_utils.clearDatabase();
	test_utils.removeFolders();
    } catch(err){
	done(err);
    }
    done();
});

