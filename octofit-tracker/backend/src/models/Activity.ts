import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    points: { type: Number, default: 0, min: 0 },
    loggedAt: { type: Date, default: Date.now },
  },
  { collection: 'activities', timestamps: true },
);

export const Activity = models.Activity || model('Activity', activitySchema);