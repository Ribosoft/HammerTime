//Use this to add utilities functions
var utils = require('utils');

exports.index = function(req, res){
  res.render('index', { title: 'Ribosot'});
};

exports.design = function(req, res){
    //Create a unique ID for the sequence
    //Save ID in database
    //Redirect to /design/{ID}

    console.log(utils.generateUID());
  res.render('index', { title: 'Ribosot'});
};

//req.params[0] will contain the id of the sequence in process
exports.design_page = function(req, res){
  res.render('design_page', { title: 'Ribosot - Design Options'});
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