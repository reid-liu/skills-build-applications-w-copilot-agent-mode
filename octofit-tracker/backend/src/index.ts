import express, { type NextFunction, type Request, type Response } from 'express';
import db from './config/database.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import teamsRouter from './routes/teams.js';
import usersRouter from './routes/users.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_request, response) => {
  const connected = db.readyState === 1;
  response.status(connected ? 200 : 503).json({
    status: connected ? 'ok' : 'unavailable',
    database: connected ? 'connected' : 'disconnected',
  });
});

app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error);
  response.status(500).json({ message: 'Internal server error' });
});

async function startServer() {
  await db.asPromise();
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API listening at ${baseUrl}/api/health`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start OctoFit Tracker API:', error);
  process.exit(1);
});