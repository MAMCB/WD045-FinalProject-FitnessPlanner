const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
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

module.exports = mongoose.model('User', userSchema);