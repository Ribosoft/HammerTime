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
    //do validation on req.sequence before adding to db
    var sequence = url.parse(req.url,true).query.sequence;
    
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
                res.render('index', {title: 'Ribosoft'});
            }
            else{
                res.redirect('/design/' + id);
            }
        });
    }
};

//req.params[0] will contain the id of the sequence in process
exports.design_page = function(req, res){
  //TODO implement logic to show target selection fieldset only when using accession#
  var enteredManually = true;
  
  res.render('design_page', 
  { 
      title: 'Ribosot - Design Options', 
      showTarget: enteredManually
  });
};

exports.summary_page = function(req, res){
  res.render('summary_page', { title: 'Ribosot - Summary of Design'});
};

exports.processing_page = function(req, res){
  res.render('processing_page', { title: 'Ribosot - Processing'});
};

exports.results_page = function(req, res){
  res.render('results_page', { title: 'Ribosot - Results'});
};