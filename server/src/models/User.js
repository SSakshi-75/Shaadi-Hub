import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 6,
    select: false,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  role: {
    type: String,
    enum: ['user', 'vendor', 'admin'],
    default: 'user',
  },
  profileImg: {
    type: String,
    default: '',
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
