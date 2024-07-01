const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./infrastructure/persistence/mongooseConnection');
const authRoutes = require('./interfaces/routes/authRoutes');
const corsOptions = require('./infrastructure/config/corsConfig');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.json());

connectToDatabase();

app.use('/auth', authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


