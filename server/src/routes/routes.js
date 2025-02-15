const router = require('express').Router();

const APIProducts = require('./APIproducts');

router.use('/products', APIProducts);

module.exports = router;