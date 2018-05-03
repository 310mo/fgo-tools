var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('time2', { title: 'AP回復時間チェックその２' });
});

module.exports = router;