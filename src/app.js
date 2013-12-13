var express = require('express'),
    stylus = require ('stylus'),
    db = require('./models/db'),
    mongoose = require('mongoose'),
    engine = require('ejs-locals'),
    routes = require('./routes'),
    http = require('http'),
    nib = require('nib'),
    path = require('path');

var app = express();

app.configure(function(){
    app.set('port', 8080 );
    app.engine('ejs', engine);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(stylus.middleware({
	src:__dirname + '/public',
	compile: function(str, path){
            return stylus(str).set('filename',path).set('compress',true).use(nib());
	}}));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);
    app.use(function(err, req, res, next){
	if(!err.statusCode){
	    res.status(500);
	    res.render('error', 
		       {
			   title: 'Ribosoft'
		       });    
	}
	else if(err.statusCode == 500){
	    console.log( "Server is returning a 500 because "+JSON.stringify(err) );
	    res.send(500);
	}
	else {
	    res.send(err.statusCode, {error: err.errorMessage});
	}
    });
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

//All these routes.* functions are defined in routes/index.js
app.get('/ribosoft/', routes.index);
app.get('/ribosoft', routes.redirect);
app.get('/ribosoft/api', routes.api_page);
app.get('/ribosoft/license', routes.license_page);
app.get('/ribosoft/paper', routes.coming_soon);
app.get('/ribosoft/processing/:id', routes.processing_page);
app.get('/ribosoft/results/:id', routes.results_page);

//While routes.api.* are defined in routes/api.js
app.post('/ribosoft/requests/', routes.api.createRequest);
app.get('/ribosoft/requests/:id', routes.api.getRequest);
app.del('/ribosoft/requests/:id', routes.api.deleteRequest);
app.put('/ribosoft/requests/:id', routes.api.updateRequest);
app.get('/ribosoft/requests/:id/status', routes.api.getRequestStatus);
app.get('/ribosoft/requests/:id/results', routes.api.getResults);

//For everything else, return error
app.all('/*', routes.error);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

if (module !== require.main) {
    exports.app = app;
}
