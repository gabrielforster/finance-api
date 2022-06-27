import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: false,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    userCredentials: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
    },
    profilePicture: {
        type: String,
        required: false,
        unique: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export const User = mongoose.model('User', userSchema)