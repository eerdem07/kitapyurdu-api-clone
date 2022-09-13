const mongoose = require('mongoose');
const crypto = require('crypto');

const bcrypt = require('bcrypt');

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
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on create and save
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordResetToken: {
    type: String,
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
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = function () {};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
