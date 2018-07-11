const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const dbConnection = require('./database');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport');
const path = require('path');
const dotenv = require('dotenv');
const Storage = require('@google-cloud/storage');   // google cloud sdk
const storage = Storage();
const app = express();
const PORT = process.env.PORT || 8080;



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


require('./apiRoutes')(app);

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});


var bucketname = 'gunnr1images';

// A bucket is a container for objects (files).
const bucket = storage.bucket(bucketname);

// Process the file upload and upload to Google Cloud Storage.
app.post('/uploadHandler', multer.single('file'), (req, res, next) => {
  if (!req.file) {
        res.status(400).send('No file uploaded.');
    return;
  }

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err) => {
        next(err);
    });
  
  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
      const publicUrl = format(`https://storage.googleapis.com/${bucketname}/${blob.name}`);
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});