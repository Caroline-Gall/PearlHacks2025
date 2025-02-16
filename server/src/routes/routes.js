const router = require('express').Router();

const APIitems = require('./APIitems');
const APIusers = require('./APIusers');
const APIGPT = require('./APIGPT');

router.use('/items', APIitems);
router.use('/users', APIusers);
router.use('/savings', APIGPT);


module.exports = router;