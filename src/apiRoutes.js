const express = require('express');
const User = require('./database/models/user');

module.exports = function (app) {

    app.post("/user", function (req, res) {

        console.log(req);
        console.log(res);

        User.findOne({ googleId: req.data.googleId }, (err, existingUser) => {
            if (existingUser) {
                return existingUser;
            } else {
                const user = new User();

                user.profile.name = req.data.profile.name;
                user.profile.email = req.data.profile.email;
                user.googleId = req.data.googleId;
                user.tokens.push(req.data.accessToken);
                user.ownedWeps = [];

                user.save((err, user) => {
                    return user;
                });
            }
        })
    });

}
