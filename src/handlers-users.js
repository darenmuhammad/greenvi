const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');
const { Users, insertUser, isUsernameExist } = require('../models/users');

const registerHandler = async (request, h) => {
  try {
    const { email, fullName, password, address, dateOfBirth, phoneNumber } = request.payload;

    // input validation
    const schema = Joi.object({
      email: Joi.string().pattern(new RegExp('^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });

    const { error } = schema.validate({ email, password });
    if (error) {
      return h.response(error.details[0].message).code(400);
    }

    // Check if email already exist
    const usernameExist = await isUsernameExist(email);
    if (usernameExist) {
      return h.response('email already exists.').code(400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert new user
    await insertUser(email, hashedPassword, fullName, address, dateOfBirth, phoneNumber);

    return h.response({
      status: 'success',
      message: 'registration successful!',
      data: {
        email,
        fullName,
        address,
      },
    }).code(201);
  } catch (error) {
    console.error(error);
    return h.response('Internal Server Error').code(500);
  }
};

const loginHandler = async (request, h) => {
  try {
    const { email, password, fullName } = request.payload;

    const users = await Users.findOne({ where: { email } });
    if (!users) {
      return h.response('email or password is incorrect').code(401);
    }

    const isValidPassword = await bcrypt.compare(password, users.password);
    if (!isValidPassword) {
      return h.response('email or password is incorrect').code(401);
    }

    // Set cookie for session
    h.state('userSession', { email });

    return h.response({
      status: 'success',
      message: 'login successful. welcome, ' + fullName + '!',
      data: {
        fullName,
      },
    }).code(200);
  } catch (error) {
    console.error(error);
    return h.response('Internal Server Error').code(500);
  }
};

module.exports = {
  registerHandler,
  loginHandler,
};
