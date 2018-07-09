const express = require('express');
const dbConnection = require('./database');

module.exports = function (app) {
    app.post("/user", function (req, res) {

        console.log(req);
        console.log(res);

        User.findOne({ googleId: req.googleId }, (err, existingUser) => {
            if (existingUser) {
                this.setState({ loggedIn: true });
                return (<Redirect to={'/home'} />)
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
                this.setState({ loggedIn: true });
                return (<Redirect to={'/home'} />)
            }
        })
    });

}
