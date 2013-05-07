
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Ribosot'});
};

exports.design_page = function(req, res){
  res.render('design_page', { title: 'Design Options'});
};

exports.summary_page = function(req, res){
  res.render('summary_page', { title: 'Summary of Design'});
};

exports.processing_page = function(req, res){
  res.render('processing_page', { title: 'Summary of Design'});
};

exports.results_page = function(req, res){
  res.render('results_page', { title: 'Results'});
};