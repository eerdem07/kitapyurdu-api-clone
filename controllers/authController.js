const User = require('../models/userModel');

const jwt = require('jsonwebtoken');

const createToken = (id) => {
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      nickname: req.body.nickname,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      bornDate: req.body.bornDate,
      photo: req.body.photo,
    });

    const token = createToken();

    res.status(201).json({
      status: 'success',
      token,
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      err,
    });
  }
};

exports.login = () => {};
