const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    sexo: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
