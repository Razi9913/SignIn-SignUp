import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minilength: 8,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date,
    default: Date.now(),
  },
  emailOtp: {
    type: String,
    default: "",
  },
  emailOtpExpiryAt: {
    type: Date,
    default: null,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordTokenExpiryAt: {
    type: Date,
    default: null,
  },
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)