const router = require('express').Router();

const items = require('../data/items.json');

router.get('/', (req, res) => {
  res.json(items.items);
});

router.post('/', (req, res) => {
  try {
    const newItem = {
      "item_id": items.items.length + 1,
      "name": req.body.name,
      "description": req.body.description,
      "pic_path": null,
      "price": Number(req.body.price),
      "location": req.body.location,
      "category": [ "academic" ],
      "owner_id": 2,
      "is_available": true
    }
    console.log(newItem)
    items.items.push(newItem);
    res.json({flag: true});
  }
  catch (error){
    res.status(404).json({flag: false, error: error});
  }
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