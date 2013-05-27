//Use this to add utilities functions
var utils = require('utils'),
    url = require('url'),
    mongoose = require('mongoose');

var Request = mongoose.model('Request');

exports.index = function(req, res){
  res.render('index', { title: 'Ribosoft', stepTitle: 'Step 1 - Selecting the sequence'});
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
      showTarget: enteredManually,
      urlPost : "../summary/"+req.params.id
  });
};

exports.summary_page = function(req, res){
    console.log("id = "+req.params.id);
    console.log("cutsites = "+req.params.cutsites);
    Request.findOne({uuid:req.params.id}, function(err, request){
        if(err)
            console.log("cannot find id "+err);
        else{
            request.targetRegion = parseInt(req.params.region);
            var env = request.targetEnv = (req.params.env === "vivo");
            if(env){
                request.vivoEnv = req.params.envVivo;
            }
            request.tempEnv = parseInt(req.params.temperature);
            request.naEnv = parseInt(req.params.naC);
            request.mgEnv = parseInt(req.params.mgC);
            request.oligoEnv = parseInt(req.params.oligoC);
            request.cutsites = req.params.cutsites.split(",");
            request.foldShape = req.params.foldShape.split(",");
            request.foldSW = req.params.foldSW.split(",");
            request.save(function(err, request, count){
               if(err){
                   console.log("cannot save "+err);
                   res.redirect('/ribosoft/');                   
               } 
               else{
                   res.render('summary_page',
                    { 
                    title: 'Ribosot - Summary of Design',
                    stepTitle: 'Step 3 - Summary',
                    seqLength: request.sequence.length(),
                    targetRegion: request.targetRegion,
                    targetEnv: request.targetEnv,
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
  res.render('processing_page', { title: 'Ribosot - Processing'});
};

exports.results_page = function(req, res){
  res.render('results_page', { title: 'Ribosot - Results'});
};