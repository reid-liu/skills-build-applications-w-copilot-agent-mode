import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    displayName: { type: String, trim: true },
    role: { type: String, default: 'student' },
  },
  { collection: 'users', timestamps: true },
);

export const User = models.User || model('User', userSchema);