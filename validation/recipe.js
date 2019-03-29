const isEmpty = require('./is-empty');
const Validator = require('validator');

function validateRecipeInput(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.info = !isEmpty(data.info) ? data.info : '';
  data.rating = !isEmpty(data.rating) ? data.rating : '';
  data.recommendrecipe = !isEmpty(data.recommendrecipe) ? parseInt(data.recommendrecipe) : '';

  //Refactor this later during frontend testing
  if (data.recommendrecipe < 0 || data.recommendrecipe > 1) {
    errors.recommendrecipe = 'Recommend recipe must be a yes or no';
  }

  if (isNaN(data.rating)) {
    errors.rating = 'Rating must be a number';
  }

  if (data.rating > 5 || data.rating < 0) {
    errors.rating = 'Rating must be between 0 and 5';
  }

  if (!isNaN(data.info)) {
    errors.info = 'Info must be a string'
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  if (!isNaN(data.name)) {
    errors.name = 'Name name must be a string'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateRecipeInput
