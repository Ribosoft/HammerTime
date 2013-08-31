var utils = require('route_utils');
var url = require('url'),
        mongoose = require('mongoose');
var algorithm = require('algorithm');
var execFile = require('child_process').execFile;
var fs = require('fs');

var Request = mongoose.model('Request');
var Candidate = mongoose.model('Candidate');
var Structure = mongoose.model('Structure');
var Pair = mongoose.model('Pair');

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
    //TODO SUPER IMPORTANT
    //do validation on sequence before adding to db 
    var sequence = req.body.sequence;

    //Yes, this is super lame input validation
    if (!sequence)
    {
        utils.renderInputError("No sequence was submitted.", next);
    }
    else {
        var id = utils.generateUID();
        Request.createRequest(id, sequence).save(function() {
            res.json({id: id});
        });
    }
};

//req.params.id will contain the id of the sequence in process
exports.design_page = function(req, res) {
    //TODO implement logic to show target selection fieldset only when using accession#
    var enteredManually = true;
    res.render('design_page',
            {
                title: 'Ribosot - Design Options',
                stepTitle: 'Step 2 - Design Options',
                submitButtonId: 'submit2',
                showTarget: enteredManually,
                urlPost: "../summary/" + req.params.id
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
            result.foldShape = utils.objectToArrayString(req.body.foldShape);
            result.foldSW = utils.objectToArrayString(req.body.foldSW);
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
                            foldShape: result.foldShape,
                            foldSW: result.foldSW
                        });
            }));
        }
    });

};

exports.processing_page = function(req, res, next) {
    //TODO Rewrite as external lib
    setInterval(Request.flushOutdatedRequests, utils.SECONDS_IN_WEEK * 1000);

    var uuid = req.params.id;
    //launch request processing
    Request.findOne({uuid: uuid}, function(err, result) {
        if (err || !result) {
            utils.renderDatabaseError("cannot find id with error " + err + "or result " + result, next);
        } else {
            console.log("cutsites ="+result.cutsites);
            var request = new AlgoRequest(
//                    result.sequence,
            'GUACGUAUGCAUCGACUAGUCAGCAGAUCGUACUGAUGCUAGCUAGCUAGCUAGAGAUGAGUACGCCGAGAGUAGGUCGUGCUAGCGCGCGAGAGAGU',
                    ' ', {
                'tempEnv': 37,
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
                        console.log("State = "+request.State);
                    if(request.Completed) {
                        result.status = 4;
                        result.save(utils.onSaveHandler(function(result, next) {
                            console.log("Request "+result.uuid+" has finished.");
                        }));
                    }
                });
            try {
                RequestExecutor.HandleRequestPart1(request);
            } catch (ex) {
                utils.renderInternalError("Something went wrong when executing the request: "+ex, next);
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
//    execFile('./node_modules/algorithm/test.js',
//            [],
//            null,
//            function(err, stdout, stderr){
//                if(err) console.log("error");
//                console.log("stderr "+stderr);
//                Request.findOne({uuid: uuid}, function(err, result) {
//                    result.status = 4;
//                    result.save(utils.onSaveHandler(function(result, next) {
//                        console.log("Request "+result.uuid+" has finished.");
//                    }));
//                });
//            });
//    res.render('processing_page',
//            {
//                title: 'Ribosot - Processing',
//                stepTitle: 'Step 4 - Processing',
//                estimatedDur: '2 hours',
//                estimatedDurInMin: 120,
//                urlEmail: "../remember/" + req.params.id,
//                urlResults: "../results/" + req.params.id
//            });
       
};

exports.processing_status = function(req, res, next) {
    var uuid = req.params.id;
    Request.findOne({uuid: uuid}, function(err, result) {
        if (err || !result) {
            utils.renderDatabaseError("cannot find id with error " + err + "or result " + result, next);
        } else {
            var finished = (result.status === 4);
            console.log("result.status =="+result.status);
            console.log("Request finished =="+finished);
            res.json(200, { finished: finished });
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

exports.results_page = function(req, res) {
    var path = require('path').resolve(__dirname, '../Test/requestState.json');
    var json_output = require(path);
    res.render('results_page', {
            title: 'Ribosot - Results',
            stepTitle: 'Step 5 - Results',
            results: json_output.CutsiteTypesCandidateContainer
        });
}
