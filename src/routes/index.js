var api = require('./api'),
    utils = require('./route_utils'),
    url = require('url'),
    mongoose = require('mongoose'),
    fs = require('fs');

var Request = mongoose.model('Request');

exports.api = api;

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
/*
exports.processing_page = function(req, res, next) {
    //TODO Rewrite as external lib
    setInterval(Request.flushOutdatedRequests, utils.SECONDS_IN_WEEK * 1000);
    

    if(result.status !== 3 && req.route.method === 'post') {
	var request = Request.createAlgoRequest(id, function(request){
            result.state = request.State;
            if(request.Completed) {
		result.status = 4;
            }
            result.save(utils.onSaveHandler(function() {}, next));
	});
	try {
            var estimate = RequestExecutor.HandleRequestPart1(request);
            result.status = 3;
	    result.estimatedDur = estimate;
            result.save(utils.onSaveHandler(function(result, next) {}));
	} catch (ex) {
            utils.renderInternalError("Something went wrong when executing the request: "+ex, next);
	}
    }
    res.render('processing_page',
               {
                   title: 'Ribosoft - Processing',
                   stepTitle: 'Step 4 - Processing',
                   estimatedDur: '2 hours',
                   estimatedDurInMin: 120,
                   urlEmail: "../remember/" + req.params.id,
                   urlResults: "../results/" + req.params.id
               });
        }
    });
};
*/
exports.processing_status = function(req, res, next) {
    var uuid = req.params.id;
    Request.findOne({uuid: uuid}, function(err, result) {
        if (err || !result) {
            utils.renderDatabaseError("cannot find id with error " + err + "or result " + result, next);
        } else {
            res.json(200, {
                finished: (result.status === 4),
                state: result.state 
            });
        } 
    });
};

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
