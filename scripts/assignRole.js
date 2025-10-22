const mongoose = require('mongoose');
const Role = require('../schemas/roles');
const User = require('../schemas/users');

async function run(){
  try{
    await mongoose.connect('mongodb://localhost:27017/NNPTUD-S5');
    console.log('MongoDB connected');
    let role = await Role.findOne({name:'USER'});
    if(!role){
      role = new Role({name:'USER', description:'Default user role'});
      await role.save();
      console.log('Created role USER');
    } else console.log('Role USER exists');
    let user = await User.findOne({username:'demo_user'});
    if(!user){
      console.log('demo_user not found');
      process.exit(1);
    }
    user.role = role._id;
    await user.save();
    console.log('Assigned USER role to', user.username);
    process.exit(0);
  }catch(err){
    console.error(err);
    process.exit(1);
  }
}
run();
