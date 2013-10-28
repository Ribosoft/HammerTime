var express = require('express'),
    stylus = require ('stylus'),
    db = require('./models/db'),
    mongoose = require('mongoose'),
    engine = require('ejs-locals'),
    routes = require('./routes'),
    http = require('http'),
    nib = require('nib'),
    path = require('path'),
    shutdown = require('shutdown');

var app = express();

app.configure(function(){
    app.set('port', 8080 );
    app.engine('ejs', engine);
    app.set('views', __dirname + '/views')
    app.set('view engine', 'ejs');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(shutdown.handle);
    app.use(stylus.middleware({
	src:__dirname + '/public',
	compile: function(str, path){
            return stylus(str).set('filename',path).set('compress',true).use(nib());
	}}));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);
    app.use(function(err, req, res, next){
	console.log( "Error ="+err );
	if(!err.statusCode){
	    res.status(500);
	    res.render('error', 
		       {
			   title: 'Ribosoft'
		       });    
	}
	else if(err.statusCode == 500)
	    res.send(500);
	else
	    res.send(err.statusCode, err.errorMessage);
    });
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

//All these routes.* functions are defined in routes/index.js
app.get('/ribosoft/', routes.index);
app.get('/ribosoft', routes.redirect);
app.get('/ribosoft/about', routes.about_page);
app.get('/ribosoft/api', routes.api_page);
app.get('/ribosoft/processing/:id', routes.processing_page);
//app.get('/ribosoft/status/:id', routes.processing_status);
//The email page will be replaced by a confirmation on the processing page
//app.get('/ribosoft/remember/:id', routes.email_page);
app.get('/ribosoft/results/:id', routes.results_page);

//While routes.api.* are defined in routes/api.js
app.post('/ribosoft/requests/', routes.api.createRequest);
app.get('/ribosoft/requests/:id', routes.api.getRequest);
app.del('/ribosoft/requests/:id', routes.api.deleteRequest);
app.put('/ribosoft/requests/:id', routes.api.updateRequest);
app.get('/ribosoft/requests/:id/status', routes.api.getRequestStatus);
app.get('/ribosoft/requests/:id/results', routes.api.getResults);

var server = http.createServer(app);
shutdown.set('forceShutdown', 10*1000);
shutdown.set(server, function(){
    mongoose.connection.close();
    process.exit();   
});

server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

if (module !== require.main) {
    exports.app = app;
}
