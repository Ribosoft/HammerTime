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

exports.about_page = function(req, res) {
    res.render('about', {title: 'About Ribosoft'});
};

exports.api_page = function(req, res) {
    res.render('api', {title: 'Developer API'});
};

exports.processing_page = function(req, res, next) {
    res.render('processing_page', { title: 'Ribosoft - Processing' });
};
/*
exports.email_page = function(req, res, next) {
    var uuid = req.params.id;
    if (!req.body.email) {
        utils.renderInputError("Email was empty.");
    }

    Request.findRequest(uuid, function(err, result) {
        if (err || !result) {
            utils.renderDatabaseError("Could not find request", next);
        }
        else {
            result.emailUser = req.body.email;
            result.save(utils.onSaveHandler(function(result, next) {
                res.render('email_page',
                {
                    title: 'Ribosoft - Notification setup',
                });
            }));
        }
    });
};
*/
exports.results_page = function(req, res, next) {
    var path = require('path').join('/home/admin/ribosoft/', req.params.id, '/requestState.json');

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
