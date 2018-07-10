const express = require('express');
const User = require('./database/models/user');
const app = express();


    app.post("/user", function (req, res) {

        console.log(req);
        console.log(res);

        User.findOne({ googleId: req.body.googleId }, (err, existingUser) => {
            if (existingUser) {
                return existingUser;
            } else {
                const user = new User();

                user.profile.name = req.body.profile.name;
                user.profile.email = req.body.profile.email;
                user.googleId = req.body.googleId;
                user.tokens.push(req.body.accessToken);
                user.ownedWeps = [];

                user.save((err, user) => {
                    return user;
                });
            }
        })
    });


module.exports = app 