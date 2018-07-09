const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema({
    profile: {
        name: {
            type: String,
            unique: false,
            required: true
        },
        email: {
            type: String,
            unique: false,
            required: true
        }
    },
    googleId: {
        type: String,
        unique: true,
        required: true
    },
    tokens: Array,
    ownedWeps: {
        type: Array,
        unique: false,
        required: false
    }

}, {timestamps:true});

const User = mongoose.model('User', userSchema);
module.exports = User;