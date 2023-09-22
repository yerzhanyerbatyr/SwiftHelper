const mongoose = require ('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String
    },
    spotifyLink:{
        type: String
    }
});

module.exports=mongoose.model('Song', songSchema);