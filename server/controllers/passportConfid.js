const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport){
    passport.use(
        new localStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email: email })
                .then(async (user) => {
                    if (!user) {
                        return done(null, false); // User not found
                    }
                    // Compare the provided password with the hashed password
                    try {
                        const passwordMatch = await bcrypt.compare(password, user.password);
                        if (passwordMatch) {
                            return done(null, user); // Passwords match, user authenticated
                        } else {
                            return done(null, false); // Passwords do not match
                        }
                    } catch (err) {
                        return done(err);
                    }
                })
                .catch((err) => {
                    return done(err);
                });
        })
    );
    passport.serializeUser((user,cb)=>{
        cb(null,user.id);
    });
    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id })
            .then((user) => {
                cb(null, user);
            })
            .catch((err) => {
                cb(err, null);
        });
    });
}