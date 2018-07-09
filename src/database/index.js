//Connect to Mongo database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const uri = 'mongodb://alan:uymt3vaa@ds121331.mlab.com:21331/heroku_lf577jfl'

mongoose.connect(uri).then(
    () => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        console.log('Connected to Mongo');

    },
    err => {
        /** handle initial connection error */
        console.log('error connecting to Mongo: ')
        console.log(err);

    }
);


module.exports = mongoose.connection