var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
/* GET home page. */
router.get('/', function(req, res) {
  var vert = [];
  request(
    'http://track.mtbachelor.com/tyt.asp?passmediacode=MBA6438294&season=12-13&currentday=null',
    function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //var parsedHTML = $.load(body);
      $ = cheerio.load(body);
      $('tr').map(function(i, el) {
        $(this).children('td').map(function(i, el) {
          if (i == 2) {
            console.log($(this).text());
          }
        })
      });
    }
  });
  res.render('index', { title: 'TurnGrafz' });
});

module.exports = router;
