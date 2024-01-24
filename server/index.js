const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 8000;
const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const workoutPlanRouter = require('./routes/workoutPlan');
const workoutSessionRouter = require('./routes/workoutSession');
const exerciseRouter = require('./routes/exercise');
const exerciseAPIRouter = require('./routes/exerciseAPI');

app.use(cors());
app.use(express.json());
app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/workoutPlan', workoutPlanRouter);
app.use('/workoutSession', workoutSessionRouter);
app.use('/exercise', exerciseRouter);
app.use('/exerciseAPI', exerciseAPIRouter); 


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}   );