const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema =  mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida']
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: {
      values: ['USER_ROLE', 'ADMIN_ROLE'],
      message: 'El rol {VALUE} no es valido.'
    }
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(uniqueValidator, {
  message: 'Error, el {PATH} debe ser unico.'
});
userSchema.methods.toJSON = function() {
  let user = this;
  let userObj = user.toObject();
  delete userObj.password;

  return userObj
};
module.exports = mongoose.model('User', userSchema);