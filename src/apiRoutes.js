const express = require('express');
const User = require('./database/models/user');
const app = express();


    app.post("/user", function (req, res) {
        console.log("user login");
        console.log(req);
        console.log(res);

        let currentUser = sessionStorage.getItem('currentUser');
        console.log(currentUser);

        User.findOne({ googleId: currentUser.googleId }, (err, existingUser) => {
            if (existingUser) {
                res.json(existingUser);
            } else {
                const newUser = new User({
                    profile: {
                        name: currentUser.profile.name,
                        email: currentUser.profile.email
                    },
                    googleId: currentUser.googleId,
                    tokens: currentUser.accessToken
                    
                });

                newUser.save((err, savedUser) => {
                    if (err) return res.json(err)
                    res.json(savedUser)
                });
            }
        })
    });


module.exports = app;