var utils = require('./route_utils');
var url = require('url'),
    mongoose = require('mongoose'),
    algorithm = require('algorithm'),
    fs = require('fs'),
    request = require('request');

var Request = mongoose.model('Request');

var RequestExecutor = algorithm.HandleRequest;
var Model = algorithm.Model;
var AlgoRequest = Model.DomainObjects.Request;

exports.index = function(req, res) {
    res.render('index', {title: 'Ribosoft', stepTitle: 'Step 1 - Selecting the sequence'});
};

exports.redirect = function(req, res) {
    res.redirect('/ribosoft/');
};

exports.about = function(req, res) {
    res.render('about', {title: 'About Ribosoft'});
};

exports.api = function(req, res) {
    res.render('api', {title: 'Developer API'});
};

exports.design = function(req, res, next) {
    function checkAccession (accession, successCallback, errorCallback) {
        request({
            uri: "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id="+accession+"&rettype=fasta&retmode=text",
            method: "GET",
            followRedirect : false
        }, function(err, res, body) {
            if(!err && res.statusCode == 200) {
               var seq = body.split('\n');
               seq.shift();
               successCallback(seq.join(""));
            } else {
                errorCallback(err);
            }
        });
    };
    
    function sendResponse(sequence, accessionNumber){
        if(!sequence) {
            utils.renderInputError("No sequence was submitted.", next);
        } else {
            var id = utils.generateUID();
            Request.createRequest(id, sequence, accessionNumber).save(function() {
                res.json({id: id});
            });
        }
    };

    var sequence = req.body.sequence;
    var accessionNumber = req.body.accessionNumber;
    
    if (!sequence && !accessionNumber)
    {
        utils.renderInputError("No sequence was submitted.", next);
    } 
    else if(!sequence) {
        checkAccession(accessionNumber, function(seq) {
            sendResponse(seq, accessionNumber);
        }, function(error){
            utils.renderInputError("Accession Number is invalid.", next);
            accessionNumber = '';
        });
    } 
    else if (sequence && accessionNumber) {
        checkAccession(accessionNumber, function(seq) {
            if(sequence !== seq){
                utils.renderInputError("Sequence and accession number do not match.", next);
                accessionNumber = '';
                sequence = '';
            } else {
                sendResponse(seq, accessionNumber);
            }
        }, function(error){
            utils.renderInputError("Accession Number is invalid.", next);
            accessionNumber = '';
        });        
    } else {
        sendResponse(sequence, '');
    }
};

exports.design_page = function(req, res) {
    Request.findOne({uuid: req.params.id}, function(err,result){
        if (err || !result) {
            utils.renderDatabaseError("cannot find id with error " + err + "or result " + result, next);
        }
        else {
            res.render('design_page',
            {
                title: 'Ribosot - Design Options',
                stepTitle: 'Step 2 - Design Options',
                submitButtonId: 'submit2',
                showTarget: !result.accessionNumber,
                urlPost: "../summary/" + req.params.id
            });
        }
    });
};

exports.summary_page = function(req, res, next) {
    var uuid = req.params.id;
    Request.findOne({uuid: uuid}, function(err, result) {
        if (err || !result) {
            utils.renderDatabaseError("cannot find id with error " + err + "or result " + result, next);
        }
        else {
            result.targetRegion = parseInt(req.body.region);
            var env = result.targetEnv = (req.body.env === "vivo");
            if (env) {
                result.vivoEnv = req.body.envVivo;
            }
            result.tempEnv = parseInt(req.body.temperature);
            result.naEnv = parseInt(req.body.naC);
            result.mgEnv = parseInt(req.body.mgC);
            result.oligoEnv = parseInt(req.body.oligoC);
            result.cutsites = (typeof req.body.cutsites === "string") ?
                    new Array(req.body.cutsites.toUpperCase()) :
                    utils.objectToArrayStringUpper(req.body.cutsites);
            result.foldShape = req.body.foldShape;
            result.save(utils.onSaveHandler(function(result, next) {
                var targetEnv = result.getEnv();
                res.render('summary_page',
                        {
                            title: 'Ribosot - Summary of Design',
                            stepTitle: 'Step 3 - Summary',
                            urlPost: "../processing/" + uuid,
                            seqLength: result.sequence.length,
                            targetRegion: result.getRegion(),
                            targetEnv: targetEnv.env,
                            vivoEnv: targetEnv.vivoEnv,
                            tempEnv: result.tempEnv,
                            naEnv: result.naEnv,
                            mgEnv: result.mgEnv,
                            oligoEnv: result.oligoEnv,
                            cutsites: result.cutsites,
                            foldShape: result.foldShape
                        });
            }));
        }
    });

};

exports.processing_page = function(req, res, next) {
    //TODO Rewrite as external lib
    setInterval(Request.flushOutdatedRequests, utils.SECONDS_IN_WEEK * 1000);

    var uuid = req.params.id;
    Request.findOne({uuid: uuid}, function(err, result) {
        if (err || !result) {
            utils.renderDatabaseError("cannot find id with error " + err + "or result " + result, next);
        } else {
            if(result.status !== 3 && req.route.method === 'post') {
		var request = new AlgoRequest(
                    result.sequence,
                    result.accessionNumber,
		    {
			'tempEnv': result.tempEnv,
			'naEnv': result.naEnv,
			'mgEnv': result.mgEnv,
			'oligoEnv': result.oligoEnv,
			'cutsites': result.cutsites,
			'left_arm_min': 3,
			'right_arm_min': 3,
			'left_arm_max': 8,
			'right_arm_max': 8
		    },
		    result.uuid,
                    0,
                    'blah',
                    function(request){
                        result.state = request.State;
                        if(request.Completed) {
                            result.status = 4;
                        }
                        result.save(utils.onSaveHandler(function(result, next) {}));
                    });
		try {
                    RequestExecutor.HandleRequestPart1(request);
                    result.status = 3;
                    result.save(utils.onSaveHandler(function(result, next) {}));
		} catch (ex) {
                    utils.renderInternalError("Something went wrong when executing the request: "+ex, next);
		}
            }
            res.render('processing_page',
            {
                title: 'Ribosot - Processing',
                stepTitle: 'Step 4 - Processing',
                estimatedDur: '2 hours',
                estimatedDurInMin: 120,
                urlEmail: "../remember/" + req.params.id,
                urlResults: "../results/" + req.params.id
            });
        }
    });
};

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
            title: 'Ribosot - Results',
            stepTitle: 'Step 5 - Results',
            results: json_output
        });
    } catch( error ){
	utils.renderInputError("Could not load results for "+req.params.id, next);
    }
}
