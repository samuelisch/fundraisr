const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const fetchedUsers = await User
    .find({})

  response.json(fetchedUsers);
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User
    .findById(req.params.id)
  
  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

module.exports = usersRouter