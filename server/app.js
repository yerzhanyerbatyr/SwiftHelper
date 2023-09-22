require('dotenv').config();
const express = require('express');
const {db} = require('./db/db');
const {readdirSync} = require('fs');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const User = require("./models/userModel");
const Song = require("./models/songModel");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { getSongByName } = require('./controllers/spotySearch');
const { TextServiceClient } =
  require("@google-ai/generativelanguage").v1beta2;

const { GoogleAuth } = require("google-auth-library");
const API_KEY = process.env.PALMAPI_KEY;
const client = new TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(session({
    secret: process.env.SECRETKEY,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser(process.env.SECRETKEY));
app.use(passport.initialize());
app.use(passport.session());

require('./controllers/passportConfid')(passport);

readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

const server = () => {
    db();
    app.post("/login",(req,res,next)=>{
        passport.authenticate("local",(err,user,info)=>{
            if (err) {
                return res.status(401).json({ error: 'Login failed' });
            }
            if (!user) {
                return res.status(401).json({ error: 'No user found' });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.status(401).json({ error: 'Login failed' });
                }
                res.status(200).json({ message: 'Login successfull' });
            });
        })(req,res,next);
    })

    app.post("/register",(req,res)=>{
        User.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        })
            .then( async (doc) =>{
                if (doc) {
                    if (doc.email === req.body.email) {
                        res.status(201).json({ message: 'Email already exists' });
                    } else {
                        res.status(201).json({ message: 'Username already exists' });
                    }
                }
                if (!doc){
                    const hashedPassword = await bcrypt.hash(req.body.password,10);
                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: hashedPassword,
                        likedSongs: []
                    });
                    await newUser.save();
                    res.send("User created");
                }
            })
            .catch((err)=>{
                throw err;
            });
    });
    app.get("/user",(req,res)=>{
        if (req.user && req.user.username) {
            res.json({ id:req.user._id, username: req.user.username, email: req.user.email, likedSongs: req.user.likedSongs });
          }
    })

    app.post('/user/:userId/addSong/:songName', async(req,res)=>{
        try{
            const {userId, songName} = req.params;
            const spotyLink = await getSongByName(songName);
            const newSong = new Song({ title: songName, spotifyLink: spotyLink});
            const user = await User.findById(userId);
            await newSong.save();
            user.likedSongs.push({songId: newSong._id, songTitle: songName});
            await user.save();
            return res.status(200).json({ message: 'Song added to liked list' });
        } catch (err){
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });

    app.delete('/user/:userId/deleteSong/:songId', async(req,res)=>{
        try{
            const {userId, songId} = req.params;
            const user = await User.findById(userId);
            user.likedSongs.pull(songId);
            await user.save();
            await Song.findByIdAndRemove(songId);
            return res.status(200).json({ message: 'Song removed from liked list' });
        } catch (err){
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
    app.delete('/user/:userId/deleteAllSongs', async (req, res) => {
        try {
            const {userId} = req.params;
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            const songIdsToDelete = user.likedSongs;
    
            user.likedSongs = [];
            await user.save();
    
            await Song.deleteMany({ _id: { $in: songIdsToDelete } });
    
            return res.status(200).json({ message: 'All songs removed from liked list and deleted from Songs collection' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
    app.get('/user/:userId/recommendSong', async (req, res) => {
        try {
            const {userId} = req.params;
            const user = await User.findById(userId).populate('likedSongs');
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const likedSongs = await user.likedSongs.map(song => song.songTitle);
            const likedSongsString = likedSongs.join('", "');
            const prompt = `Recommend one Taylor Swift song similar to "${likedSongsString}" but only from the albums "Speak Now," "Fearless," "Red," "Lover," "Midnights," "folklore," or "evermore." Exclude songs from "Reputation," "1989," and "Taylor Swift" album, and song "Style. Please provide only the song title.`;

            client
            .generateText({
            model: "models/text-bison-001",
            temperature: 0.8,
            candidateCount: 1,
            prompt: {
                text: prompt,
            },
            })
            .then((result) => {
            result.forEach((d1)=>{
                if (d1 != null){
                    d1.candidates.forEach(function(d2){
                        const recommendedSong = d2.output;
                        return res.status(200).json({ recommendedSong });  
                    })
                }
            })
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });

    // Define a new route to check if a song exists in a user's likedSongs list
    app.get('/user/:userId/likedSongs/check/:songTitle', async (req, res) => {
    try {
      const { userId, songTitle } = req.params;
      
      // Find the user by userId and populate the likedSongs array
      const user = await User.findById(userId).populate('likedSongs');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Check if a song with the given songTitle exists in the likedSongs list
      const foundSong = user.likedSongs.find((song) => song.songTitle === songTitle);
      
      if (foundSong) {
        // Song exists, send the songId and result
        return res.status(200).json({ songId: foundSong._id, songExists: true });
      } else {
        // Song does not exist, send result as false
        return res.status(200).json({ songExists: false });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
    
    
    app.listen(5000, () =>{
        console.log('Listening to:', 5000);
    })
}

server();