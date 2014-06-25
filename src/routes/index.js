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
    res.render('license', {title: 'License'});
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
    var path = require('path').join('/home/admin/ribosoft/', req.params.id, '/requestState.json');
//    var path = '/Users/aambri/SWProjects/HammerTime/src/requestState.json';
    var json_output = '', resultMessage = '';
    try {
	json_output = require(path);
    } catch(error) {
	resultMessage = 'No candidates that meet the Annealing Temperature constraints could be generated. This is generally addressed by adjusting the arm lengths edges to be longer.';
    }
    Request.findOne({uuid: req.params.id}, function(err, request){
	var obj = {
            title: 'Ribosoft - Results',
            stepTitle: 'Step 5 - Results',
            results: json_output,
	    resultMessage: resultMessage,
	    input : {}
	};
	if(err) {
	    res.render('results_page', obj);
	} else if(!request){
	    res.redirect('/error');
	} else {
	    obj.input = {
		sequence: request.sequence,
		accessionNumber : request.accessionNumber,
		foldShape : request.foldShape,
		tempEnv : request.tempEnv,
		naEnv : request.naEnv,
		mgEnv : request.mgEnv,
		oligoEnv : request.oligoEnv,
		cutsites : request.cutsites.join(", "),
		promoter : (request.promoter? "Yes" : "No"),
		left_arm_min : request.left_arm_min,
		right_arm_min : request.right_arm_min,
		left_arm_max : request.left_arm_max,
		right_arm_max : request.right_arm_max,
		targetRegion : request.getRegion().join(", "),
		targetEnv : "In-" + request.getTargetEnv(),
		vivoEnv : request.getEnv().target,
		specificity : (request.specificity == "cleavage")? "Cleavage only" : "Cleavage and Hybridization"		
	    };
	    res.render('results_page', obj);
	};

    });

};
