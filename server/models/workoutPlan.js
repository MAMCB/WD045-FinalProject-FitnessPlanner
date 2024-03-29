const mongoose = require("mongoose");
const exerciseTypes = require("./exerciseTypes");


const workoutPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    goal: { type: String, required: true },
    difficulty: { type: Number, min: 1, max: 10, required: true, default: 1 },
    image: {
      type: String,
      required: true,
      default:
        "https://freepngimg.com/thumb/hand/76374-fitness-logo-vector-creative-download-hd-png.png",
    },
    equipment: { type: Boolean, required: true, default: false },
    type: {
      type: String,
      enum: exerciseTypes,
      required: true,
      default: exerciseTypes[exerciseTypes.length - 1],
    },
    visibility: { type: Boolean, required: true, default: false }, //true if public, false if private
    rating: { type: Number, min: 0, max: 5, default: 0 },
    exercises: { type: Array, default: [] },
    exerciseDuration: { type: Number, default: 0 },
    restDuration: { type: Number, default: 0 },
    planVersions: { type: Array, default: [] },
    createdDay: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Pre-save hook to update planVersions
workoutPlanSchema.pre("save", function (next) {
  if (this.isNew) {
    // Add the default version to planVersions if it's a new document
    this.planVersions.unshift({
      name: this.name + "-V0",
      goal: this.goal,
      difficulty: this.difficulty,
      image: this.image,
      equipment: this.equipment,
      type: this.type,
      visibility: this.visibility,
      rating: this.rating,
      exercises: this.exercises,
      exerciseDuration: this.exerciseDuration,
      restDuration: this.restDuration,
      createdDay: this.createdDay,
    });
  }
  next();
});

module.exports = mongoose.model("WorkoutPlan", workoutPlanSchema);
