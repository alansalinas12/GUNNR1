const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const dbConnection = require('./database');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 8080;

const user = require('./apiRoutes');

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
}

// MIDDLEWARE
app.use(morgan('dev'));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// Sessions
app.use(
    session({
        secret: "randomrandom",
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false,
        saveUninitialized: true
    })
);

app.use('/user', user);

// Access the session as req.session
app.get('/', function (req, res, next) {
    if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
        console.log(req.session);
    } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
    }
})

// Starting Server 
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});