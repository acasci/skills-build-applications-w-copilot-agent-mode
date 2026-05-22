import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 * This script populates the database with realistic sample data for all collections
 */
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create Users
    const users = await User.insertMany([
      {
        username: 'octocat',
        email: 'octocat@github.com',
        password: 'hashed_password_1',
        firstName: 'Octo',
        lastName: 'Cat'
      },
      {
        username: 'mona',
        email: 'mona@github.com',
        password: 'hashed_password_2',
        firstName: 'Mona',
        lastName: 'Lisa'
      },
      {
        username: 'hubot',
        email: 'hubot@github.com',
        password: 'hashed_password_3',
        firstName: 'Hu',
        lastName: 'Bot'
      },
      {
        username: 'gitty',
        email: 'gitty@github.com',
        password: 'hashed_password_4',
        firstName: 'Git',
        lastName: 'Ty'
      }
    ]);
    console.log(`👥 Created ${users.length} users`);

    // Create Teams
    const teams = await Team.insertMany([
      {
        name: 'Code Crushers',
        description: 'We crush code and calories!',
        captainId: users[0]._id,
        members: [users[0]._id, users[1]._id]
      },
      {
        name: 'Fit Developers',
        description: 'Building healthy habits one commit at a time',
        captainId: users[2]._id,
        members: [users[2]._id, users[3]._id]
      }
    ]);
    console.log(`🏆 Created ${teams.length} teams`);

    // Update users with team IDs
    await User.findByIdAndUpdate(users[0]._id, { teamId: teams[0]._id });
    await User.findByIdAndUpdate(users[1]._id, { teamId: teams[0]._id });
    await User.findByIdAndUpdate(users[2]._id, { teamId: teams[1]._id });
    await User.findByIdAndUpdate(users[3]._id, { teamId: teams[1]._id });

    // Create Activities
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        activityType: 'Running',
        duration: 30,
        distance: 5,
        calories: 300,
        notes: 'Morning run in the park'
      },
      {
        userId: users[0]._id,
        activityType: 'Cycling',
        duration: 45,
        distance: 15,
        calories: 400
      },
      {
        userId: users[1]._id,
        activityType: 'Swimming',
        duration: 40,
        distance: 2,
        calories: 350,
        notes: 'Pool session'
      },
      {
        userId: users[2]._id,
        activityType: 'Weight Training',
        duration: 60,
        calories: 450,
        notes: 'Upper body workout'
      },
      {
        userId: users[3]._id,
        activityType: 'Yoga',
        duration: 50,
        calories: 200,
        notes: 'Relaxing morning yoga'
      }
    ]);
    console.log(`🏃 Created ${activities.length} activities`);

    // Create Workouts
    const workouts = await Workout.insertMany([
      {
        name: 'Quick HIIT',
        description: 'High-intensity interval training for busy developers',
        difficulty: 'Intermediate',
        exercises: ['Burpees', 'Mountain Climbers', 'Jump Squats', 'Push-ups'],
        estimatedDuration: 20,
        targetMuscles: ['Full Body', 'Cardio']
      },
      {
        name: 'Strength Builder',
        description: 'Build muscle and strength with compound movements',
        difficulty: 'Advanced',
        exercises: ['Deadlifts', 'Squats', 'Bench Press', 'Pull-ups'],
        estimatedDuration: 60,
        targetMuscles: ['Legs', 'Back', 'Chest', 'Arms']
      },
      {
        name: 'Beginner Friendly',
        description: 'Perfect for getting started with fitness',
        difficulty: 'Beginner',
        exercises: ['Walking', 'Light Stretching', 'Bodyweight Squats', 'Wall Push-ups'],
        estimatedDuration: 30,
        targetMuscles: ['Full Body']
      }
    ]);
    console.log(`💪 Created ${workouts.length} workouts`);

    // Create Leaderboard entries
    const leaderboard = await Leaderboard.insertMany([
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        totalCalories: 450,
        totalActivities: 1,
        totalDistance: 0,
        totalDuration: 60,
        rank: 1
      },
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        totalCalories: 700,
        totalActivities: 2,
        totalDistance: 20,
        totalDuration: 75,
        rank: 2
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        totalCalories: 350,
        totalActivities: 1,
        totalDistance: 2,
        totalDuration: 40,
        rank: 3
      },
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        totalCalories: 200,
        totalActivities: 1,
        totalDistance: 0,
        totalDuration: 50,
        rank: 4
      }
    ]);
    console.log(`📊 Created ${leaderboard.length} leaderboard entries`);

    console.log('✅ Database seeded successfully!');
    console.log('📝 Summary:');
    console.log(`   - ${users.length} users`);
    console.log(`   - ${teams.length} teams`);
    console.log(`   - ${activities.length} activities`);
    console.log(`   - ${workouts.length} workouts`);
    console.log(`   - ${leaderboard.length} leaderboard entries`);

    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
