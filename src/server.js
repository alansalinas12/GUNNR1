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



// Starting Server 
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});