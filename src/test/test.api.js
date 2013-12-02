var app = require(process.cwd()+'/app').app,
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    async = require('async'),
    test_utils = require('./test_utils'),
    test_data = require('./test_data');
    
var Request = mongoose.model('Request');

describe('POST: /requests/', function(){
    var sequenceOnlyData = test_data.smallSequence.request;
    var noTargetData = test_data.noTarget.request;
    var sequenceAndAccessionData = test_data.sequenceWithAcc.request;
    var seqAndWrongAccessionData = test_data.sequenceWithWrongAcc.request;
    var wrongAccessionData = test_data.wrongAcc.request;
    var accessionOnlyData = test_data.accessionNumberOnly.request;
    var noData = test_data.noData.request;


    it('POST /requests with sequence only', function(done) {
	async.waterfall([
	    test_utils.createRequest(app,sequenceOnlyData, done),
	    test_utils.requestChecker(sequenceOnlyData, done)
	],
	function(err, done){
	    if(err)
		test_utils.errorHandler(err, done);
	    else
		done();
	});
    });

    it('POST /requests with accession number only', function(done) {
	async.waterfall([
	    test_utils.createRequest(app, accessionOnlyData, done),
	    test_utils.requestChecker(accessionOnlyData, done)
	],
	function(err, done){
	    if(err)
		test_utils.errorHandler(err, done);
	    else
		done();
	});
    });

    it('POST /requests with no targetRegion', function(done) {
	async.waterfall([
	    test_utils.createRequest(app, noTargetData, done),
	    test_utils.requestChecker(noTargetData, done)
	],
	function(err, done){
	    if(err)
		test_utils.errorHandler(err, done);
	    else
		done();
	});
    });

    
    it('POST /requests with sequence and accessionNumber', function(done) {
	async.waterfall([
	    test_utils.createRequest(app, sequenceAndAccessionData, done),
	    test_utils.requestChecker(sequenceAndAccessionData, done)
	],
	function(err, done){
	    if(err)
		test_utils.errorHandler(err, done);
	    else 
		done();
	});
    });

    it('POST /requests with no sequence nor accessionNumber', function(done) {
	async.waterfall([
	    test_utils.createRequest(app,sequenceOnlyData, done),
	    test_utils.requestChecker(sequenceOnlyData, done)
	],
	function(err, done){
	    if(err)
		test_utils.errorHandler(err, done);
	    else
		done();
	});
    });
    

    it('POST /requests with sequence and wrong accessionNumber', function(done) {
	async.waterfall([
	    test_utils.createRequest(app, seqAndWrongAccessionData, done),
	    test_utils.requestChecker(seqAndWrongAccessionData, done)
	],
	function(err, done){
	    if(err)
		test_utils.errorHandler(err, done);
	    else 
		done();
	});
    });

    
    it('POST /requests with wrong accessionNumber only', function(done) {
	async.waterfall([
	    test_utils.createBadRequest(app, wrongAccessionData, done),
	    test_utils.checkBadRequestError("Accession Number is invalid.", done)
	],
	function(err, done){
	    if(err)
		test_utils.errorHandler(err, done);
	    else 
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

    it('GET /requests/<id>/status returns 202, status and duration for ready for processing requests', function(done) {
	async.waterfall([
	    test_utils.createRequest(app, data, done),
	    test_utils.setRequestReady(duration, done),
	    test_utils.getReadyRequestStatus(app, duration, done)
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
    
    it('GET /requests/<id>/status?extraInfo=true returns state for ready for processing requests', function(done) {
	async.waterfall([
	    test_utils.createRequest(app, data, done),
	    test_utils.setRequestReady(duration, done),
	    test_utils.getReadyRequestStatus(app, duration, done)
	],
	function(err, done){
	    test_utils.errorHandler(err, done);
	    if(!err) done();
	});
    });

    it('GET /requests/<id>/status?extraInfo=true returns state for in-processing request', function(done) {
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

    it('GET /requests/<id>/status?extraInfo=true returns state for processed request', function(done) {
	async.waterfall([
	    test_utils.createRequest(app, data, done),
	    test_utils.setRequestProcessed(duration, done),
	    test_utils.getProcessedRequestStatusExtra(app, {"remainingDuration":0,"unit":'min'}, done)
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
	test_utils.removeFolders();
	test_utils.clearDatabase(done);
    } catch(err){
	done(err);
    }
});

