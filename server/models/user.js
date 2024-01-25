const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: [true , "Name is required"] },
    email: { type: String, unique: true, required: [true, "Email is required"] },
    password: { type: String, required: [true, "Password is required"],minLength: [8, "Password must be at least 8 characters"]},
    profilePic: {
      type: String,
      default:
        "https://lh6.googleusercontent.com/proxy/i3o6o_HVc0XQaPNEpxAVDJw1QyLH6LRIw_OxAKjhOm5lZQDimRQYyz9_vIGDpMnEliSpI6AKhSbDqvzc4zIDdg3Cx5HAaLvjhE0dfz-Wns9I89ULsgeG8w=s0-d",
    },
    joinedDate: { type: Date, default: Date.now },
    age: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    weight:{ type: Number, default: 0},
    workoutSessions:{type: Array, default: []},
    friends:{type: Array, default: []},
    musicPlaylists:{type: Array, default: []},
  },
  { timestamps: true }
);

UserSchema.path("email").validate(async (value) => {
  const emailCount = await mongoose.models.User.countDocuments({
    email: value,
  });
  return !emailCount;
}, "Email already exists");

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

  UserSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
      this.invalidate("confirmPassword", "Passwords must match!!!");
      console.log("Passwords don't match!");
    }
    next();
  });

  UserSchema.pre("save", async function (next) {
    console.log("in pre save");
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
  });

  const User = mongoose.model("User", UserSchema);


module.exports = mongoose.model('User', userSchema);