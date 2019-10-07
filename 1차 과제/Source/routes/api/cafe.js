var express = require('express');
var router = express.Router();

// localhost:3000
router.get('/', (req, res) => {
    res.send('cafe입니다.');
});

module.exports = router;
