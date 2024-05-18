const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const BaseModelSchema = require('./base/Base');
const Subscription = require('./Subscription');

const UserModel = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        maxlength: 20,
        required: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    }
});

UserModel.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;

      return next();
    } catch (error) {
      return next(error);
    }
  });

UserModel.add(BaseModelSchema)
module.exports = mongoose.model('user', UserModel);