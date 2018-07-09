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


// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
}

// Route requires
const user = require('./routes/userRoutes');

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
        saveUninitialized: false
    })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/login', user);

// Starting Server 
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});