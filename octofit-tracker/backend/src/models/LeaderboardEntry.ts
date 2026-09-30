import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0, min: 0 },
    rank: { type: Number, min: 1 },
  },
  { collection: 'leaderboard', timestamps: true },
);

export const LeaderboardEntry = models.LeaderboardEntry || model('LeaderboardEntry', leaderboardEntrySchema);