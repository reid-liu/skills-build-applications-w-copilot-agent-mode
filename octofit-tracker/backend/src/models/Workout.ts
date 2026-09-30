import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    fitnessLevel: { type: String, default: 'beginner' },
    durationMinutes: { type: Number, min: 0 },
    activities: [{ type: String, trim: true }],
  },
  { collection: 'workouts', timestamps: true },
);

export const Workout = models.Workout || model('Workout', workoutSchema);