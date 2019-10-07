var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Who are you?'); //화면에 보이는 글
});

module.exports = router;
