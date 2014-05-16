var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

var getTurnData = function(passno, season, callback) {
  var reqUrl = 'http://track.mtbachelor.com/tyt.asp?passmediacode=' + passno + '&season=13-14&currentday=null'
  var turns = [];
  request(reqUrl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body); // parse html...
      var tableRowCount = $('.customerContent').next().children('tr').length;
      // loop through each row and push values to array...
      $('.customerContent').next().children('tr').map(function(i, el) {
        if (i != 0 && i < (tableRowCount-4)) {
          var row = [];
          $(this).children('td').map(function(i, el) {
            if (i == 0) {
              var dateStr = $(this).text();
              var firstTick = dateStr.indexOf('/');
              var secondTick = dateStr.indexOf('/', (firstTick + 1 ));
              var y = dateStr.slice(secondTick + 1);
              var m = dateStr.slice(0, firstTick);
              var d = dateStr.slice((firstTick + 1), secondTick);
              row.push( Date.UTC(y, m, d) );
            }
            if (i == 2) {
              row.push( parseInt($(this).text()) );
            }
          });
          turns.push(row);
        }
      });
    }
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
    res.render('turngraf', { turns: JSON.stringify(turns) });
  })
});

module.exports = router;
