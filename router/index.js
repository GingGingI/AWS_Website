const router = require('express').Router();

router.get('/', require('./controller'));

router.use('/teabo', require('./teabo'));

module.exports = router;
