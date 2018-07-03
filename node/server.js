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
const PORT = 8080;

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

// Route requires
const user = require('./routes/user');

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
        secret: process.env.SESSION_SECRET,
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false,
        saveUninitialized: false
    })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/user', user);

// Starting Server 
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});