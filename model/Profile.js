const mongoose = require('mongoose');
const { Schema } =  mongoose;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  bio: {
    type: String
  },
  recipesStored: [
    {
      name: {
        type: String,
        required: true
      },
      info: {
        type: String
      },
      rating: {
        type: Number,
        min: 0,
        max: 5
      },
      recommendRecipe: {
        type: String
      }
    }
  ]
})

const Profile = mongoose.model('profiles', profileSchema);

module.exports = Profile;
