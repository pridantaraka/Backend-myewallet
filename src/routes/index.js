const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/transactions', require('./transactions'))
router.use('/profiles', require('./profiles'))

module.exports = router