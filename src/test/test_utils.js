var fs = require('fs'),
    request = require('supertest'),
    mongoose = require('mongoose');

var Request = mongoose.model('Request');

var rmDirIfExists = function(pathToDir){
    if(fs.existsSync(pathToDir)){
        fs.rmdirSync(pathToDir);        
    }
};

var createRequest = function(app, data, done){
    return function(callback) {
	request(app).post('/ribosoft/requests/')
            .send(data)
            .expect(201)
            .end(function(err, res) {
		if(err)	callback(err, done);
		else {
		    var url = res.headers.location;
		    var id = url.substring(url.lastIndexOf('/')+1);
		    id.should.have.lengthOf(4);
		    callback(null, id);
		}
	    });
    };
};

function createInexistentRequest(app, data, done){
    return function(callback){
	var id = 'aaaa'; //Almost impossible to be generated
	callback(null, id);
    };
};

var requestDBChecker = function(data, done){
    return function(id, callback) {
	Request.findOne({uuid: id}, function(err, result) {
	    if(err) callback(err, done);
	    else {
		data.sequence.should.equal(result.sequence);
		callback(null, done);
	    }
	});
    };
};


var getRequest = function(app, data, done) {
    return function(id, callback) {
	request(app).get('/ribosoft/requests/'+id)
            .expect(200)
            .end(function(err, res) {
		if(err)	callback(err, done);
		else {
		    var request = res.body;
		    id.should.equal(request.id);
		    delete request.id;
		    request.should.eql(data);
		    callback(null, done);
		}
	    });
    }
};

function getInexistentRequest(app , data, done){
    return function(id, callback) {
	request(app).get('/ribosoft/requests/'+id)
            .expect(404)
            .end(function(err, res) {
		if(err)	callback(err, done);
		else {
		    console.log( JSON.stringify(res.body) );
		    callback(null, done);
		}
	    });
    }
}


exports.getInexistentRequest = getInexistentRequest;
exports.createInexistentRequest = createInexistentRequest;
exports.rmDirIfExists = rmDirIfExists;
exports.createRequest = createRequest;
exports.requestDBChecker = requestDBChecker;
exports.getRequest = getRequest;
