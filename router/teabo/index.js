const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.normal);
// router.get('/:speed', controller.setSpeed);

module.exports = router;
