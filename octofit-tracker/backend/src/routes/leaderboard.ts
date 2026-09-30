import { Router } from 'express';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1, points: -1 }).lean();
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

export default router;