var app = require(process.cwd()+'/app').app,
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    utils = require('./test_utils');
    
var Request = mongoose.model('Request');



// Always keep last
after(function(done){
    utils.clearDatabase();
    done();
});
