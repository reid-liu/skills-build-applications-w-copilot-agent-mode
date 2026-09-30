import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'maya-rivera',
        email: 'maya.rivera@mergington.edu',
        displayName: 'Maya Rivera',
        role: 'student',
      },
      {
        username: 'liam-chen',
        email: 'liam.chen@mergington.edu',
        displayName: 'Liam Chen',
        role: 'student',
      },
      {
        username: 'sofia-patel',
        email: 'sofia.patel@mergington.edu',
        displayName: 'Sofia Patel',
        role: 'student',
      },
      {
        username: 'coach-octo',
        email: 'paul.octo@mergington.edu',
        displayName: 'Paul Octo',
        role: 'coach',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Cardio Crew',
        mascot: 'Falcon',
        memberIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Strength Squad',
        mascot: 'Tiger',
        memberIds: [users[2]._id],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        activityType: 'Running',
        durationMinutes: 32,
        points: 96,
        loggedAt: new Date('2026-09-25T15:30:00.000Z'),
      },
      {
        userId: users[1]._id,
        activityType: 'Cycling',
        durationMinutes: 45,
        points: 110,
        loggedAt: new Date('2026-09-26T14:15:00.000Z'),
      },
      {
        userId: users[2]._id,
        activityType: 'Strength Training',
        durationMinutes: 40,
        points: 120,
        loggedAt: new Date('2026-09-27T16:00:00.000Z'),
      },
      {
        userId: users[0]._id,
        activityType: 'Yoga',
        durationMinutes: 25,
        points: 60,
        loggedAt: new Date('2026-09-28T13:45:00.000Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        points: 120,
        rank: 1,
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        points: 110,
        rank: 2,
      },
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        points: 96,
        rank: 3,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Beginner Cardio Builder',
        description: 'A low-friction cardio session for students building consistency.',
        fitnessLevel: 'beginner',
        durationMinutes: 30,
        activities: ['Brisk walk', 'Light jog intervals', 'Cooldown stretch'],
      },
      {
        title: 'Core Strength Circuit',
        description: 'Bodyweight exercises focused on safe form and total-body strength.',
        fitnessLevel: 'intermediate',
        durationMinutes: 35,
        activities: ['Squats', 'Push-ups', 'Plank holds', 'Lunges'],
      },
      {
        title: 'Recovery and Mobility',
        description: 'Stretching and mobility work for active recovery days.',
        fitnessLevel: 'all levels',
        durationMinutes: 20,
        activities: ['Dynamic stretching', 'Yoga flow', 'Breathing cooldown'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
