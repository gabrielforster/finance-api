import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    roles: { type: Array, required: false },
    profilePicture: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
})


export const User = mongoose.model('User', usersSchema)