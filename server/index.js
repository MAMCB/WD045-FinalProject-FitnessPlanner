const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 8000;
const homeRouter = require('./routes/home');

app.use(cors());
app.use(express.json());
app.use('/', homeRouter);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}   );