var express = require('express');
var router = express.Router();

// localhost:3000/auth/signin
router.use('/like', require('./like'));
// localhost:3000/auth/signup

router.get('/', (req, res) => {
    res.send('news입니다');
})

module.exports = router;
