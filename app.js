var express = require('express');
var request = require('request');
var jsdom = require('jsdom');

// Create express app
var app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/assets'));

// Handler for all GET requests
var wikiRoot = 'https://github.com/rootsdev/rootsdev.github.com/wiki';
app.get('*', function(req, res){
  
  // Remove trailing slash if requesting home page
  var path = req.path;
  if( path == '/' ) {
    path = '';
  }

  // Fetch associated github wiki article
  request( wikiRoot + path, function( error, response, body){
  
    if( error && response.statusCode !== 200 ) {
      res.send(404);
    } else {
    
      // Parse the article with jsdom
      jsdom.env({
        html: body,
        scripts: [
          'http://code.jquery.com/jquery-1.7.min.js'
        ]
      }, function(err, window) {
        var $ = window.jQuery;

        // Return the wiki article's body        
        res.render('template', {
          wikiBody: $('#wiki-body').html(),
          wikiTitle: $('#head .instapaper_title').html(),
          lastUpdated: $('#last-edit time').html(),
          githubLink: wikiRoot + path
        });

      });
      
    }

  });

});

// Bind app to port
var port = process.env.PORT || 3000;
app.listen(port);
