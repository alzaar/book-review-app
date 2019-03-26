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
  booksRead: [
    {
      title: {
        type: String,
        required: true
      },
      author: {
        type: String
      },
      yearRead: {
        type: Number,
        min: 1950,
        max: 2030
      },
      rating: {
        type: Number,
        min: 0,
        max: 5
      },
      recommendBook: {
        type: String
      }
    }
  ]
})

const Profile = mongoose.model('profiles', profileSchema);

module.exports = Profile;
