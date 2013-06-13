//Use this to add utilities functions
var utils = require('utils'),
    url = require('url'),
    mongoose = require('mongoose');

var Request = mongoose.model('Request');

exports.index = function(req, res){
  res.render('index', { title: 'Ribosoft', stepTitle: 'Step 1 - Selecting the sequence'});
};

exports.about = function(req, res){
  res.render('about', { title: 'About Ribosoft' });
};

exports.redirect = function(req, res){
  res.redirect('/ribosoft/');
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
        new Request({
            uuid: id,
            status: 1,
            sequence: sequence
        }).save(function(err) {
            if (err)
            {
                //Should return an error that would be handled at client level
                console.log("Error, redirecting to index");
                res.render('index', 
                {
                    title: 'Ribosoft',
                    stepTitle: 'Step 1 - Selecting the sequence',
                });
            }
            else{
                res.json({id: id});
            }
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
                    new Array(req.body.cutsites) : utils.objectToArrayString(req.body.cutsites);
            result.foldShape = utils.objectToArrayString(req.body.foldShape);
            result.foldSW = utils.objectToArrayString(req.body.foldSW);
            result.save(function(err, request, count){
               if(err){
                   console.log("cannot save "+err);
                   res.redirect('/ribosoft/');                   
               } 
               else{
                   //console.log("request ="+request);
                   res.render('summary_page',
                    {
                    title: 'Ribosot - Summary of Design',
                    stepTitle: 'Step 3 - Summary',
                    urlPost : "../processing/"+uuid,
                    seqLength: 20,//request.sequence.length(),
                    targetRegion: (request.targetRegion === 4)? 'ORF':
                            (request.targetRegion === 5)?'5\'':'3\'',
                    targetEnv: (request.targetEnv)? 'In-vivo':'In-vitro',
                    vivoEnv: request.vivoEnv,
                    tempEnv: request.tempEnv,
                    naEnv: request.naEnv,
                    mgEnv: request.mgEnv,
                    oligoEnv: request.oligoEnv,
                    cutsites: request.cutsites,
                    foldShape: request.foldShape,
                    foldSW: request.foldSW
                    });
               }
            });
        }
    });

};

exports.processing_page = function(req, res){
  res.render('processing_page', 
            { 
              title: 'Ribosot - Processing',
              stepTitle: 'Step 4 - Processing',
              estimatedDur : '2 hours',
              estimatedDurInMin : 120,
              urlEmail : "../remember/"+req.params.id
            });
};

exports.email_page = function(req, res){
    var uuid = req.params.id;
    if(!req.body.email){
        console.log("Email was empty. This should have been handled on client-side");
        res.end();
    }
    Request.findOne({uuid: uuid}, function(err, result) {
        if (err || !result) {
            console.log("cannot find id with error " + err + "or result " + result);
            res.end();
        }
        else {
            result.emailUser = req.body.email;
            result.save(function(err, request, count) {
                if (err) {
                    console.log("cannot save " + err);
                    res.redirect('/ribosoft/');
                }
                else {
                    //console.log("request ="+request);
                    res.render('email_page',
                    {
                        title: 'Ribosot - Notification setup',
                    });
                }
            });
        }
    });
};

exports.results_page = function(req, res){
  res.render('results_page', { title: 'Ribosot - Results'});
};