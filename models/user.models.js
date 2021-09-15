const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: {
        type: String,
        require: [true, 'name-required']
    }, 

    username: {
        type: String,
        require: [true, 'username-required'],
        trim: true,
        unique: true
    }, 

    email: {
        type: String, 
        require: [true, 'email-required'],
        trim: true, 
        unique: true
    }, 

    avatar: {
        type: String, 
        trim: true
    }, 

    siteWeb: {
        type: String,
        trim: true
    }, 

    description: {
        type: String,
        trim: true
    }, 

    password: {
        type: String, 
        require: [true, 'password-required'],
        trim: true
    }, 

    createAt: {
        type: Date,
        default: Date.now(),
    },

})

module.exports = mongoose.model('User', UserSchema);