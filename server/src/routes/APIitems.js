
const router = require('express').Router();

const items = require('../data/items.json');

//const howls = require('./data/howls.json');

router.get('/', (req, res) => {
  res.json(items.items);
});

// EXAMPLE 
router.post('/', (req, res) => {
  try {
    const newHowl = {
      "id": howls.length + 1,
      "userId": req.body.userId,
      "datetime": req.body.datetime,
      "text": req.body.text,
    }
    howls.push(newHowl);
    res.json({flag: true});

  }
  catch (error){
    res.status(404).json({flag: false, error: error});
  }
});


// EXAMPLE 
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const userHowls = howls.filter(howl => howl.userId == userId);
  res.json(userHowls);
});



module.exports = router