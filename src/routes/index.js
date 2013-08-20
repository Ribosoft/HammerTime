//Use this to add utilities functions
var utils = require('utils');
var url = require('url'),
    mongoose = require('mongoose');

var Request = mongoose.model('Request');
var Candidate = mongoose.model('Candidate');
var Structure = mongoose.model('Structure');
var Pair = mongoose.model('Pair');

var renderInputError = function(clientMessage, consoleMessage) {
    consoleMessage = consoleMessage || "This should have been handled on client side";
}

var renderDatabaseError = function(clientMessage, consoleMessage) {
    consoleMessage = consoleMessage || htmlMessage;
    //Should return an error that would be handled at client level
    console.log(consoleMessage);
    res.render('error', 
    {
        title: 'Ribosoft',
        stepTitle: clientMessage,
    });    
};

var onSaveHandler = function(successCallback) {
    return function(err, result){
        if (err)
        {
            renderDatabaseError("Something went wrong","Could not save. Render error");
        }
        else{
            successCallback(result);
        }
    };
};

exports.index = function(req, res){
  res.render('index', { title: 'Ribosoft', stepTitle: 'Step 1 - Selecting the sequence'});
};

exports.redirect = function(req, res){
  res.redirect('/ribosoft/');
};  

exports.about = function(req, res){
  res.render('about', { title: 'About Ribosoft' });
};

exports.api = function(req, res){
  res.render('api', { title: 'Developer API' });
};

exports.design = function(req, res){
    //TODO SUPER IMPORTANT
    //do validation on sequence before adding to db 
    var sequence = req.body.sequence;
    
    //Yes, this is super lame input validation
    if(!sequence)
    {
        //Should return an error that would be handled at client level
        console.log("Error, redirecting to index");
        res.render('index', { title: 'Ribosoft'});
    }
    else{
        var id = utils.generateUID();
        Request.createRequest(id,sequence).save(function(){
            res.json({id: id});
        });
    }
};

//req.params.id will contain the id of the sequence in process
exports.design_page = function(req, res){
  //TODO implement logic to show target selection fieldset only when using accession#
  var enteredManually = true;
  res.render('design_page', 
  { 
      title: 'Ribosot - Design Options',
      stepTitle: 'Step 2 - Design Options',
      submitButtonId: 'submit2',
      showTarget: enteredManually,
      urlPost : "../summary/"+req.params.id
  });
};

exports.summary_page = function(req, res){
    var uuid = req.params.id;
    Request.findOne({uuid:uuid}, function(err, result){
        if(err || !result){
            console.log("cannot find id with error "+err+"or result "+result);
            res.end();
        }
        else{
            result.targetRegion = parseInt(req.body.region);
            var env = result.targetEnv = (req.body.env === "vivo");
            if(env){
                result.vivoEnv = req.body.envVivo;
            }
            result.tempEnv = parseInt(req.body.temperature);
            result.naEnv = parseInt(req.body.naC);
            result.mgEnv = parseInt(req.body.mgC);
            result.oligoEnv = parseInt(req.body.oligoC);
            result.cutsites = (typeof req.body.cutsites === "string")?
                               new Array(req.body.cutsites) : 
                               utils.objectToArrayString(req.body.cutsites);
            result.foldShape = utils.objectToArrayString(req.body.foldShape);
            result.foldSW = utils.objectToArrayString(req.body.foldSW);
            result.save(onSaveHandler(function(result){
                var targetEnv = result.getEnv();
                res.render('summary_page',
                {
                    title: 'Ribosot - Summary of Design',
                    stepTitle: 'Step 3 - Summary',
                    urlPost : "../processing/"+uuid,
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

exports.processing_page = function(req, res){
  //TODO Rewrite as external lib
  setInterval(Request.flushOutdatedRequests, utils.SECONDS_IN_WEEK*1000);
  
  //launch request processing
  
  res.render('processing_page', 
            { 
              title: 'Ribosot - Processing',
              stepTitle: 'Step 4 - Processing',
              estimatedDur : '2 hours',
              estimatedDurInMin : 120,
              urlEmail : "../remember/"+req.params.id,
              urlResults : "../results/"+req.params.id
            });
};

exports.email_page = function(req, res){
    var uuid = req.params.id;
    if(!req.body.email){
        console.log("Email was empty. This should have been handled on client-side");
        res.end();
    }
    
    Request.findRequest(uuid, function(err, result){
        if( err || !result ) {
            renderError("Could not find request");
        }
        else {
            result.emailUser = req.body.email;
            result.save(onSaveHandler(function(err, result){
                res.render('email_page',
                {
                    title: 'Ribosoft - Notification setup',
                });
            }));
        }
    });
};

exports.results_page = function(req, res){
  res.render('results_page', { title: 'Ribosot - Results',
                               stepTitle: 'Step 5 - Results'});
};
