var express = require('express');
var router = express.Router();
var http = require('http');

var options = {
  host: 'http://google.com',
  path: '/',
  port: '80',
};

/* GET home page. */
router.get('/', function(req, res) {

  console.log(options)

  //callback = function(response) {
  //  console.log(response);
  //}

  var req = http.request(options);
  req.end();
  res.render('index', { title: 'TurnGrafz' });
});

module.exports = router;
