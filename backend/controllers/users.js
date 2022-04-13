const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const Campaign = require('../models/campaign')
const userExtractor = require('../utils/middleware').userExtractor;

usersRouter.get('/', async (request, response) => {
  const fetchedUsers = await User
    .find({})
  response.json(fetchedUsers);
})

usersRouter.get('/:id', userExtractor, async (request, response) => {
  const loggedUserId = request.user._id.toString()
  const userId = request.params.id
  if (loggedUserId !== userId) {
    response.status(401).send({ error: 'Unauthorised' });
  }

  const user = await User
    .findById(userId)
  
  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password.length < 5) {
    response.status(400).json({ error: "Minimum password length of 5 required"})
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    name: body.name,
    email: body.email,
    passwordHash,
    createdOn: new Date().toISOString() // create and turn into string
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

//edit details of user (not password)
usersRouter.put('/edit/:id', userExtractor, async (request, response) => {
  const body = request.body;
  const loggedUserId = request.user._id.toString()
  const userId = request.params.id
  if (loggedUserId !== userId) {
    response.status(401).send({ error: 'Unauthorised' });
  }

  const updatedUser = await User
    .findByIdAndUpdate(request.params.id, body, {new: true})

  if (updatedUser) {
    response.json(updatedUser)
  } else {
    response.status(404).end()
  }
})

usersRouter.put('/edit/password/:id', userExtractor, async (request, response) => {
  const body = request.body;
  const loggedUserId = request.user._id.toString()
  const userId = request.params.id
  const user = await User.findById(userId)
  if (loggedUserId !== userId) {
    response.status(401).send({ error: 'Unauthorised' });
  }

  const passwordCorrect = await bcrypt.compare(body.oldPassword, user.passwordHash)

  if (!passwordCorrect) {
    return response.status(401).json({
      error: 'Invalid password'
    })
  }

  const password = body.newPassword;
  if (password.length < 5) {
    response.status(400).json({ error: "Minimum password length of 5 required"})
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const updatedUser = await User
    .findByIdAndUpdate(request.params.id, {passwordHash}, {new: true})
  
  if (updatedUser) {
    response.json(updatedUser)
  } else {
    response.status(404).end()
  }
})

usersRouter.delete('/:id', userExtractor, async (request, response) => {
  const loggedUserId = request.user._id.toString()
  const userId = request.params.id
  if (loggedUserId !== userId) {
    response.status(401).send({ error: 'Unauthorised' });
  }

  await User.findByIdAndRemove(userId);
  await Campaign.deleteMany({ userCreated: userId })

  response.status(204).end()
})

module.exports = usersRouter