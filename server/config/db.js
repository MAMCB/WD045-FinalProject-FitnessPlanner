const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        
        const con = await mongoose.connect(
          process.env.MONGODB_ATLAS_CONNNECTION_STRING,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
          }
        );
        console.log(`MongoDB connected: ${con.connection.host}`);
        console.log("Database connected successfully");
    } catch (err) {
        console.log("Database connection failed");
        console.log(err);
        process.exit(1);
    }
};
module.exports = connectDB;