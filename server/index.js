

require('dotenv/config');
const express = require('express');

const app = express();
const path = require('path');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8000;
const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const workoutPlanRouter = require('./routes/workoutPlan');
const workoutSessionRouter = require('./routes/workoutSession');
const exerciseRouter = require('./routes/exercise');
const exerciseAPIRouter = require('./routes/exerciseAPI');
const authRouter = require('./routes/authentication');
const upload = require('./config/multer');

app.use(cors({origin:process.env.CLIENT_URL, credentials:true}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

{/*
app.use('/uploads', express.static('uploads'));
app.get('/', (req, res)=>{
    console.log(__dirname);
    const filePath = path.join(__dirname,'public', 'index.html')
    res.sendFile(filePath);
});


app.post("/upload-profile-pic",upload.single("profile_pic"),(req,res)=>{
    res.send(`<div><img src='/uploads/${req.file.filename}'></div>`)
})

*/}


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}   );