var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

var getTurnData = function(passno, season, callback) {
  var reqUrl = 'http://track.mtbachelor.com/tyt.asp?passmediacode=' + passno + '&season=13-14&currentday=null'
  var turns = [];
  var days = [];
  var vert = [];
  request(reqUrl, function(error, response, body) {
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
    turns.push(days);
    turns.push(vert);
    callback(turns);
  });
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.post('/turngraf', function(req, res) {
  var passno = req.body.user.passno;
  getTurnData(passno, '13-14', function(turns){
    res.render('turngraf', { vert: JSON.stringify(turns[1]), days: JSON.stringify(turns[0]) });
  })
});

module.exports = router;
