const router = require('express').Router();

const users = require('../data/users.json');

router.get('/', (req, res) => {
  res.json(users.users);
});

router.get('/:id', (req, res) => {
  const userId = Number(req.params.id);
  console.log(userId);
  const user = users.users.find(user => user.user_id === userId);
  console.log(user);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'user not found' });
  }
});


module.exports = router