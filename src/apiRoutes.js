const express = require('express');
const User = require('./database/models/user');
const app = express();


    app.post("/user", function (req, res) {
        console.log("user login");
        console.log(req);
        console.log(res);

        User.findOne({ googleId: req.body.googleId }, (err, existingUser) => {
            if (existingUser) {
                res.json(existingUser);
            } else {
                const newUser = new User({
                    profile: {
                        name: req.body.profile.name,
                        email: req.body.profile.email
                    },
                    googleId: req.body.googleId,
                    tokens: req.body.accessToken,
                    ownedWeps: req.body.ownedWeps
                });

                newUser.save((err, savedUser) => {
                    if (err) return res.json(err)
                    res.json(savedUser)
                });
            }
        })
    });


module.exports = app;