const mongoose = require('mongoose');
const User = require('../schemas/users');

async function run(){
  try{
    await mongoose.connect('mongodb://localhost:27017/NNPTUD-S5');
    console.log('MongoDB connected');
    const username = 'demo_user';
    const email = 'demo_user@example.com';
    const password = 'DemoPass123';
    let existing = await User.findOne({username});
    if(existing){
      console.log('User already exists:', existing.username, existing.email);
      process.exit(0);
    }
    let u = new User({username, email, password});
    await u.save();
    console.log('Created user:', {username, email, password});
    process.exit(0);
  }catch(err){
    console.error('Error:', err.message);
    process.exit(1);
  }
}
run();
