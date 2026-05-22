import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDatabase from './config/database';

// Import routes
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDatabase();

// Base URL logic for Codespaces
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'OctoFit Tracker API',
    baseUrl,
    endpoints: {
      users: `${baseUrl}/api/users`,
      teams: `${baseUrl}/api/teams`,
      activities: `${baseUrl}/api/activities`,
      leaderboard: `${baseUrl}/api/leaderboard`,
      workouts: `${baseUrl}/api/workouts`
    }
  });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    baseUrl
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${baseUrl}`);
});
