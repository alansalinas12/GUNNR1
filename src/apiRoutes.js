const express = require('express');
const dbConnection = require('./database');

module.exports = function (app) {

    app.post("/user", function (req, res) {

        console.log(req);
        console.log(res);

        User.findOne({ googleId: req.data.googleId }, (err, existingUser) => {
            if (existingUser) {
                return existingUser;
            } else {
                const user = new User();

                user.profile.name = req.data.w3.ig;
                user.profile.email = req.data.w3.U3;
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
