// seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/studentModel');

dotenv.config();

// Connect to MongoDB
connectDB();

// Sample users to seed
const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword1 = await bcrypt.hash('22124045', salt);
    const hashedPassword2 = await bcrypt.hash('22124058', salt);
    const hashedPassword3 = await bcrypt.hash('22124059', salt);
    // const hashedPassword3 = await bcrypt.hash('22124059', salt);

    // Create sample users
    const users = [
      {
        email: 'ishan.it.22@nitj.ac.in',
        password: hashedPassword1,
        role: 'student',
        name: 'Isha Nanda'
      },
      {
        email: 'laxay.it.22@nitj.ac.in',
        password: hashedPassword2,
        role: 'student',
        name: 'Laxay'
      },
      {
        email: 'manishr.it.22@nitj.ac.in',
        password: hashedPassword3,
        role: 'PR',
        name: 'Manish'
      }
    ];

    // Insert users into database
    await User.insertMany(users);
    console.log('Users seeded successfully!');
    console.log('You can now log in with these credentials:');
    console.log('- student1@example.com / password123 (Student)');
    console.log('- student2@example.com / password456 (Student)');
    console.log('- teacher@example.com / password789 (Teacher - should be rejected by student login)');

    // Disconnect from MongoDB
    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding users:', err);
    mongoose.disconnect();
  }
};

// Run the seed function
seedUsers();