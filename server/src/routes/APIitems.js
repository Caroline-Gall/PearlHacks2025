const router = require('express').Router();

const items = require('../data/items.json');

router.get('/', (req, res) => {
  res.json(items.items);
});

router.get('/:id', (req, res) => {
  const itemId = Number(req.params.id);
  const item = items.items.find(item => item.item_id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});


module.exports = router