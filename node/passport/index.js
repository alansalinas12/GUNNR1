const passport = require('passport');
const passportGoogle = require('passport-google-oauth');
const dotenv = require('dotenv');

const User = require('../database/models/user');
const GoogleStrategy = passportGoogle.OAuth2Strategy;

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
    console.log('*** serializeUser called, user: ');
    console.log(user);
    console.log('---------');
    done(null, { _id: user._id });
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
    console.log('DeserializeUser called')
    User.findOne(
        { _id: id },
        'username',
        (err, user) => {
            console.log('*** Deserialize user, user:')
            console.log(user)
            console.log('--------------')
            done(null, user)
        }
    )
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {

    if (req.user) {
        User.findOne({ google: profile.id }, (err, existingUser) => {
            if (err) { return done(err); }
            if (existingUser) {
                done(err);
            } else {
                User.findById(req.user.id, (err, user) => {
                    if (err) { return done(err); }
                    user.google = profile.id;
                    user.tokens.push({ kind: "google", accessToken });
                    user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
                    user.profile.email = profile._json.email;

                    user.save((err) => {
                        done(err, user);
                    });
                });
            }
        });
    } else {
        User.findOne({ google: profile.id }, (err, existingUser) => {
            if (err) { return done(err); }
            if (existingUser) {
                return done(undefined, existingUser);
            }
            User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
                if (err) { return done(err); }
                if (existingEmailUser) {
                    done(err);
                } else {
                    const user = new User();
                    user.profile.email = profile._json.email;
                    user.google = profile.id;
                    user.tokens.push({ kind: "google", accessToken });
                    user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;

                    user.save((err) => {
                        done(err, user);
                    });
                }
            });
        });
    }
}));

module.exports = passport;