const mongoose = require ('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    likedSongs: [
      {
          songId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Song'
          },
          songTitle: String  // Add a field for the song title
      }
  ]
});
userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('User', userSchema);