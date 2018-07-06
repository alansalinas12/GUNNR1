const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/userRoutes.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('google', {scope: ['profile']}),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            name: req.user.profile.name
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router