var utils = require('./route_utils'),
    url = require('url'),
    mongoose = require('mongoose'),
    fs = require('fs');

var Request = mongoose.model('Request');

exports.api = require('./api');

exports.index = function(req, res) {
    res.render('index', {
	title: 'Ribosoft'
    });
};

exports.redirect = function(req, res) {
    res.redirect('/ribosoft/');
};

exports.api_page = function(req, res) {
    res.render('api', {title: 'Developer API'});
};

exports.license_page = function(req, res) {
    res.render('coming_soon', {title: 'License'});
};


exports.error = function(req, res) {
    res.render('error', {title: 'Error'});
};


exports.coming_soon = function(req, res) {
    res.render('coming_soon', { title: 'Coming Soon' });
};

exports.processing_page = function(req, res, next) {
    res.render('processing_page', { title: 'Ribosoft - Processing' });
};

exports.results_page = function(req, res, next) {
//    var path = require('path').join('/home/admin/ribosoft/', req.params.id, '/requestState.json');
    var path = '/home/anas/HammerTime/src/requestState.json';
    try{
	var json_output = require(path);
	res.render('results_page', {
            title: 'Ribosoft - Results',
            stepTitle: 'Step 5 - Results',
            results: json_output,
	    resultMessage: 'Here are the results'
        });
    } catch( error ){
	res.render('results_page', {
            title: 'Ribosoft - Results',
            stepTitle: 'Step 5 - Results',
            results: '',
	    resultMessage: 'No candidates could be generated'
        });
    }
}
