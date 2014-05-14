var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.post('/turngraf', function(req, res) {
  var days = [];
  var vert = [];
  request(
    'http://track.mtbachelor.com/tyt.asp?passmediacode=MBA6438294&season=12-13&currentday=null',
    function (error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body); // parse html...
      var tableRowCount = $('.customerContent').next().children('tr').length;
      // loop through each row and push values to array...
      $('.customerContent').next().children('tr').map(function(i, el) {
        if (i != 0 && i < (tableRowCount-4)) {
          $(this).children('td').map(function(i, el) {
            if (i == 0) {
              days.push($(this).text());
            }
            if (i == 2) {
              vert.push( parseInt($(this).text()) );
            }
          });
        }
      });
    }
    res.render('turngraf', { vert: JSON.stringify(vert), days: JSON.stringify(days) });
  });
});

module.exports = router;
