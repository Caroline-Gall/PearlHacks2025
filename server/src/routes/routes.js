const router = require('express').Router();

const APIitems = require('./APIitems');
const APIusers = require('./APIusers');

router.use('/items', APIitems);
router.use('/users', APIusers);


module.exports = router;