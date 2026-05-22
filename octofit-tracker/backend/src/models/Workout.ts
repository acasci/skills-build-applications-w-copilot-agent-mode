import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  difficulty: string;
  exercises: string[];
  estimatedDuration: number;
  targetMuscles: string[];
  createdAt: Date;
}

const WorkoutSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  exercises: [{ type: String, required: true }],
  estimatedDuration: { type: Number, required: true },
  targetMuscles: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
