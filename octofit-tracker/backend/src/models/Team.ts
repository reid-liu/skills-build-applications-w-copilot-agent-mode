import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    mascot: { type: String, trim: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { collection: 'teams', timestamps: true },
);

export const Team = models.Team || model('Team', teamSchema);