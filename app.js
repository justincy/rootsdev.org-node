var express = require('express');
var request = require('request');
var jsdom = require('jsdom');

// Create express app
var app = express();

var wikiRoot = 'https://github.com/rootsdev/rootsdev.github.com/wiki';

// Handler for all GET requests
app.get('*', function(req, res){
  
  // Remove trailing slash if requesting home page
  var path = req.path;
  if( path == '/' ) {
    path = '';
  }

  // Fetch associated github wiki article
  request(path, function( error, response, body){
  
    if( error && response.statusCode !== 200 ) {
      res.send(404);
    }
    
    // Parse the article with jsdom
    jsdom.env({
      html: body,
      scripts: [
        'http://code.jquery.com/jquery-1.7.min.js'
      ]
    }, function(err, window) {
      var $ = window.jQuery;

      // Return the wiki article's body
      res.send($('#wiki-body').html());

    });

  });

});

// Bind app to port 80
app.listen(80);
