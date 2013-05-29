
/**
 * Module dependencies.
 */

var express = require('express'),
        stylus = require ('stylus'),
        db = require('./db'),
        engine = require('ejs-locals'),
        routes = require('./routes'),
        http = require('http'),
        nib = require('nib'),
        path = require('path');

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
  app.use(express.session());
  app.use(app.router);
  app.use(stylus.middleware({
      src:__dirname + '/public',
      compile: function(str, path){
          return stylus(str).set('filename',path).set('compress',true).use(nib());
      }}));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//All the routes.* functions are defined in routes/index.js
app.get('/ribosoft/', routes.index);
app.get('/ribosoft', routes.redirect);
app.post('/ribosoft/design', routes.design);
app.get('/ribosoft/design/:id', routes.design_page);
app.post('/ribosoft/summary/:id', routes.summary_page);
app.post('/ribosoft/processing/:id', routes.processing_page);
app.post('/ribosoft/remember/:id', routes.email_page);
app.get('/ribosoft/results/:id', routes.results_page);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
