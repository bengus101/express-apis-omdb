var express = require('express');
var request = require('request');
var app = express();
var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index')
});

app.get('/movies', function(req, res) {
	var query =req.query.q;

  var qs = {
    s: query
  };

  request({
    url: 'http://www.omdbapi.com',
    qs: qs
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var dataObj = JSON.parse(body);
      var results = dataObj.Search;

      res.render('movies', {results: results});
    }
  });
});

app.listen(3000);

// <form action="/movies" method="GET" role="form">
// 	<legend>Search for Movies</legend>

// 	<div class="form-group">
// 		<label for="">Search</label>
// 		<input type="text" class="form-control" id="" placeholder="ex. Back to the Future" name="">