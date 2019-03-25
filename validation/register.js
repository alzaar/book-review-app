const Validator = require('validator');
const isEmpty = require('./is-empty');

function validateRegisterInput(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.name = !isEmpty(data.name) ? data.name : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30';
  }

  if (!Validator.isLength(data.email, { min: 2, max: 30 })) {
    errors.email = 'Email must be between 2 and 30'
  }

  if (Validator.isEmpty(data.name)) {
    data.name = 'Name is required';
  }

  if (!Validator.isLength(data.password, { min: 2, max: 30 })) {
    data.password = 'Password must between 2 and 30'
  }

  if (!Validator.isLength(data.password2, { min: 2, max: 30 })) {
    data.password2 = 'Password must between 2 and 30'
  }

  if (!Validator.isEmpty(data.password)) {
    data.password = 'Password is required'
  }

  if (!Validator.isEmpty(data.password)) {
    data.password = 'Password is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateRegisterInput;
