import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  totalCalories: number;
  totalActivities: number;
  totalDistance: number;
  totalDuration: number;
  rank: number;
  lastUpdated: Date;
}

const LeaderboardSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  totalCalories: { type: Number, default: 0 },
  totalActivities: { type: Number, default: 0 },
  totalDistance: { type: Number, default: 0 },
  totalDuration: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
