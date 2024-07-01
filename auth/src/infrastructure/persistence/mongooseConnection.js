const mongoose = require('mongoose');

const PORT_APP = process.env.PORT_APP;
const DB_USERNAME = process.env.RAMSELVIN_MONGODB_USER;
const DB_PASSWORD = process.env.RAMSELVIN_MONGODB_PASS;
const DB_HOST = process.env.RAMSELVIN_MONGODB_HOST;
const DB_DATABASE = process.env.RAMSELVIN_MONGODB_DB;
const DB_PORT = process.env.RAMSELVIN_MONGODB_PORT;

const connectToDatabase = async () => {
    const dbUri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(dbUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
        process.exit(1);
    }
}

module.exports = connectToDatabase;
