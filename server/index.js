const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 8000;
const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const workoutPlanRouter = require('./routes/workoutPlan');
const workoutSessionRouter = require('./routes/workoutSession');
const exerciseRouter = require('./routes/exercise');
const exerciseAPIRouter = require('./routes/exerciseAPI');
const authRouter = require('./routes/authentication');

app.use(cors({origin:process.env.CLIENT_URL, credentials:true}));
app.use(cookieParser());
app.use(express.json());
app.use('/', homeRouter);
app.use('/api/user', userRouter);
app.use('/api/workoutPlan', workoutPlanRouter);
app.use('/api/workoutSession', workoutSessionRouter);
app.use('/api/exercise', exerciseRouter);
app.use('/exerciseAPI', exerciseAPIRouter);
app.use('/auth', authRouter); 

if (process.env.NODE_ENV === "production") {
  //*Set static folder up in production
  const buildPath = path.join(__dirname, "../client/dist");
  app.use(express.static(buildPath));

  app.get("*", (req, res) => res.sendFile(path.join(buildPath, "index.html")));
}



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}   );