const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  receiveEmails: { type: Boolean, required: false },
  profileImage: {
    type: String, // URL of the user's profile image
    default: 'default-profile.png'
  }
});

// Password hashing middleware before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);  // Hash password with bcrypt
  }
  next();
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
