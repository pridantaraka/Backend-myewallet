const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/transactions', require('./transactions'));
router.use('/profiles', require('./profiles'));
router.use('/auth', require('./auth'));
router.use('/authenticated', require('./authenticated'));

module.exports = router;