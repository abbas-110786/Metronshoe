const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/metronshoe');
    
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@metronshoe.com',
      password: 'admin123',
      role: 'admin'
    });
    
    await adminUser.save();
    console.log('Admin user created successfully!');
    console.log('Email: admin@metronshoe.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();