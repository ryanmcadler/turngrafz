var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
  request(
    'http://track.mtbachelor.com/tyt.asp?passmediacode=MBA6438294&season=12-13&currentday=null',
    function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  });
  res.render('index', { title: 'TurnGrafz' });
});

module.exports = router;
