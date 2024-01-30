const mongoose=require('mongoose');


const exerciseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: Number, min: 1, max: 10, required: true, default: 1 },
    image: {
      type: String,
      required: true,
      default:
        "https://freepngimg.com/thumb/hand/76374-fitness-logo-vector-creative-download-hd-png.png",
    },
    equipment: { type: String, required: true, default: "None" },
    muscleGroup: { type: String, required: true, default: "No specific" },
    visibility:{type: Boolean, required: true, default: false},//true if public, false if private
    rating: { type: Number, min: 0, max: 5, default: 0 },
  },
  { timestamps: true }
);

module.exports=mongoose.model('Exercise',exerciseSchema);