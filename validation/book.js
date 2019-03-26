const isEmpty = require('./is-empty');
const Validator = require('validator');

function validateBookInput(data) {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.author = !isEmpty(data.author) ? data.author : '';
  data.yearread = !isEmpty(data.yearread) ? data.yearread : '';
  data.rating = !isEmpty(data.rating) ? data.rating : '';
  data.recommendbook = !isEmpty(data.rating) ? parseInt(data.recommendbook) : '';

  //Refactor this later during frontend testing
  if (data.recommendbook < 0 || data.recommendbook > 1) {
    errors.recommendbook = 'Recommend Book must be a yes or no';
  }

  if (isNaN(data.rating)) {
    errors.rating = 'Rating must be a number';
  }

  if (data.rating > 5 || data.rating < 0) {
    errors.rating = 'Rating must be between 0 and 5';
  }

  if (data.yearread > 2030 || data.yearread < 1950) {
    errors.yearread = 'The year must be after 1950 and before 2030';
  }

  if (!isNaN(data.author)) {
    errors.author = 'Author\'s name must be a string'
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required';
  }

  if (!isNaN(data.title)) {
    errors.title = 'Title name must be a string'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateBookInput
