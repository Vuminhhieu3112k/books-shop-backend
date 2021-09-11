var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/books', require('./books'));
router.use('/publisher', require('./publisher'));
router.use('/author', require('./author'));
router.use('/order', require('./order'));
router.use('/publisher', require('./publisher'));
router.use('/topic', require('./topic'));
router.use('/users', require('./users'));
router.use('/register', require('./register'));
router.use('/userOder', require('./userOder'));




module.exports = router;
