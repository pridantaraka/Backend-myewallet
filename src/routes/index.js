const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/transactions', require('./transactions'));
router.use('/profiles', require('./profiles'));
router.use('/auth', require('./auth'));

module.exports = router;