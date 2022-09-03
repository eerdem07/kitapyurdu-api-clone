const User = require('../models/userModel');

const jwt = require('jsonwebtoken');

const AppError = require('../utils/appError');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
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

    const token = createToken(newUser.id);

    console.log(newUser.id);

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

exports.login = async (req, res, next) => {
  try {
    console.log(req.body);

    if (!req.body.email && !req.body.password) {
      return next(new AppError('Theres no email and password', 400));
    }

    const user = await User.find({ email: req.body.email }).select('+password');

    console.log(user);

    if (!user) next(new AppError('Theres no user for this email', 400));

    if (user.password !== req.body.password)
      return next(new AppError('Wrong password or email', 400));

    const token = createToken(user.id);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
