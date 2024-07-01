const PORT_APP = process.env.PORT_APP || 3000;
const DB_USERNAME = process.env.RAMSELVIN_MONGODB_USER;
const DB_PASSWORD = process.env.RAMSELVIN_MONGODB_PASS;
const DB_HOST = process.env.RAMSELVIN_MONGODB_HOST;
const DB_DATABASE = process.env.RAMSELVIN_MONGODB_DB;
const DB_PORT = process.env.RAMSELVIN_MONGODB_PORT;

export const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority`;
