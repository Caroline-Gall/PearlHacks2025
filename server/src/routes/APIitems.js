const router = require('express').Router();

const items = require('../data/items.json');


router.get('/', (req, res) => {
  res.json(items.items);
});

module.exports = router