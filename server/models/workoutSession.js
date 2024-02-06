const mongoose = require('mongoose');

const workoutSessionSchema = new mongoose.Schema({
    workoutId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkoutPlan",
        required: true,
    },
    version: {type: Number, required: true, default: 0},
    finishedDate: {type: Date, required: true},
    completed: {type: Boolean, required: true, default: false},
    comments: {type: [String], required: true, default: []},  
}, { timestamps: true });

module.exports = mongoose.model('WorkoutSession', workoutSessionSchema);