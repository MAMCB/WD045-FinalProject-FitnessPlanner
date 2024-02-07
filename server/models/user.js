const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinary");
const fs = require("fs")
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters"],
    },
    profilePic: {
      type: String,
      default:
        "https://lh6.googleusercontent.com/proxy/i3o6o_HVc0XQaPNEpxAVDJw1QyLH6LRIw_OxAKjhOm5lZQDimRQYyz9_vIGDpMnEliSpI6AKhSbDqvzc4zIDdg3Cx5HAaLvjhE0dfz-Wns9I89ULsgeG8w=s0-d",
    },
    joinedDate: { type: Date, default: Date.now },
    age: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    exercises: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Exercise",
      default: [],
    },
    workoutPlans: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "WorkoutPlan",
      default: [],
    },
    workoutSessions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "WorkoutSession",
      default: [],
    },
    friends: { type: [mongoose.Schema.Types.ObjectId],ref: "User", default: [] },
    musicPlaylists: { type: Array, default: [] },
  },
  { timestamps: true }
);

userSchema.path("email").validate(async (value) => {
  const emailCount = await mongoose.models.User.countDocuments({
    email: value,
  });
  return !emailCount;
}, "Email already exists");

userSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

  userSchema.pre("validate", function (next) {
    
    if (this.password !== this.confirmPassword) {
      this.invalidate("confirmPassword", "Passwords must match!!!");
      console.log("Passwords don't match!");
    }
    next();
  });
  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    //hash the password BEFORE it's saved to the db
    //Remember, we know they match from middleware above
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      //give our password the value of the returned hash
      console.log("HASHED", hashedPassword);
      this.password = hashedPassword;
      next();
    } catch (error) {
      console.log("IS THERE ANY ERROR", error);
    }

  })

   userSchema.pre("findOneAndUpdate", async function (next) {
     if (!this.getUpdate().profilePic) {
       return next();
     }
     //get the current image url of the user
     //check if the image url startsWith("https://res.cloudinary.com/"))
     //if it does execute this code:   const public_id = user.profilePic.match(//([^/]+).gif$/)[1];
    // console.log(public_id);
    // await cloudinary.uploader.destroy(public_id);
     try {
       const options = {
         public_id: this._id,
         folder: process.env.CLOUDINARY_USER_FOLDER_NAME,
       };
       const imagePath = this.getUpdate().profilePic;
       const res = await cloudinary.uploader.upload(imagePath, options);
       console.log("res.secure_url", res.secure_url);
       this.getUpdate().profilePic = res.secure_url;
       fs.unlinkSync(imagePath);
       next();
     } catch (e) {
       console.log("error", e.message);
       const imagePath = this.getUpdate().profilePic;
       fs.unlinkSync(imagePath);
       next(e.message);
     }
   });

  const User = mongoose.model("User", userSchema);


module.exports = mongoose.model('User', userSchema);