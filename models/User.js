'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    firstname: {type: String, require: true },
    lastname: {type: String, require: true }
});

const User = mongoose.model('users', userSchema);
module.exports = User;