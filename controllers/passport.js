const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
const {Strategy: LocalStrategy} = require("passport-local");

let User;
User = require('../models/user')

router.use(passport.initialize());
router.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new LocalStrategy(async(username,password,done)=>{
        try{
            const user = await User.findOne({username:username})
            const isValidPassword = (user,password)=>{
                return (user.password === password)
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }else if (!isValidPassword(user, password)) {
                return done(null, false, { message: 'Incorrect password.' });
            } else {
                return done(null, user)
            }
        } catch (err){
            done(err, null)
        }
    })
)

module.exports = router;

