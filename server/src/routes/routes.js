const router = require('express').Router();

const APIitems = require('./APIitems');

router.use('/items', APIitems);

module.exports = router;