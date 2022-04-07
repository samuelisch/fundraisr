const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const config = require('../utils/config');

loginRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne({ email: body.email })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Invalid email or password'
    })
  }

  const userForToken = {
    email: user.email,
    id: user._id
  }

  const token = jwt.sign(
    userForToken,
    config.SECRET,
    // { expiresIn: 60 * 60 } DEV NO EXPIRY YET
  )

  response
    .status(200)
    .send({ token, email: user.email, name: user.name, id: user.id})
})

module.exports = loginRouter