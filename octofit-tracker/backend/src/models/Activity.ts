import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  activityType: string;
  duration: number;
  distance?: number;
  calories: number;
  date: Date;
  notes?: string;
}

const ActivitySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  activityType: { type: String, required: true },
  duration: { type: Number, required: true },
  distance: { type: Number },
  calories: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  notes: { type: String }
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);
