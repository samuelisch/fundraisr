const config = require("./config");
const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary');
const multer = require('multer');

cloudinary.config(config.CLOUDINARY_CONFIG)

const requestLogger = (request, response, next) => {
  logger.info("Method: ", request.method);
  logger.info("Path: ", request.path);
  logger.info("Body: ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }
  if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }

  next();
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid!" });
  }

  const user = await User.findById(decodedToken.id);
  request.user = user;
  next();
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
};
