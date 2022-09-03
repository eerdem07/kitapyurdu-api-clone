const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Each user must have a name'],
    maxlength: [
      60,
      'Each user name must have greater or equal then 60 characters',
    ],
    minlength: [4, 'Each user name must have less or equal then 4 characters'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Each user must have an email'],
    trim: true,
    unique: true,
    lowercase: true,
  },
  nickname: {
    type: String,
    maxLength: [
      40,
      'Each nickname must have greater or equal then 40 characters',
    ],
    minLength: [7, 'Each nickname must have less or equal then 4 characters'],
  },
  password: {
    type: String,
    required: [true, 'Please confirm your password'],
    minlength: [8, 'Each password must bigger or equal then 8 char. '],
  },
  photo: String,
  phoneNumber: {
    type: String,
  },
  bornDate: {
    type: Date,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

userSchema.methods.createResetPasswordToken = () => {};

const User = mongoose.model('User', userSchema);

module.exports = User;
