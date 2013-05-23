//Use this to add utilities functions
var utils = require('utils'),
    url = require('url'),
    mongoose = require('mongoose');

var Request = mongoose.model('Request');

exports.index = function(req, res){
  res.render('index', { title: 'Ribosoft'});
};

exports.redirect = function(req, res){
  res.redirect('/ribosoft/');
};

exports.design = function(req, res){
    var id = utils.generateUID();
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
        new Request({
            uuid: id,
            status: 1,
            sequence: sequence
        }).save(function(err, todo, count) {
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
                res.redirect('/ribosoft/design/' + id);
            }
        });
    }
};

//req.params[0] will contain the id of the sequence in process
exports.design_page = function(req, res){
  //TODO implement logic to show target selection fieldset only when using accession#
  var enteredManually = true;
  var id = req.params[0];
  res.render('design_page', 
  { 
      title: 'Ribosot - Design Options',
      stepTitle: 'Step 2 - Design Options',
      showTarget: enteredManually,
      urlPost : "../summary/"+id
  });
};

//req.params[0] will contain the id of the sequence in process
exports.summary_page = function(req, res){
    console.log("id ="+req.params[0]);
    console.log("region ="+req.body.region);
  res.render('summary_page',
  { 
      title: 'Ribosot - Summary of Design',
      stepTitle: 'Step 3 - Summary'
  });
};

exports.processing_page = function(req, res){
  res.render('processing_page', { title: 'Ribosot - Processing'});
};

exports.results_page = function(req, res){
  res.render('results_page', { title: 'Ribosot - Results'});
};