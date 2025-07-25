import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    watchHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true
    }],

    username: {
        type: String,
        required: [true, "Username is required!"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email is not correct"]
    },

    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        trim: true,
        lowercase: true
    },

    fullName: {
        type: String,
        required: true,
        trim: true
    },

    avatar: {
        type: String,
        required: true
    },

    coverImage: {
        type: String
    },

    password: {
        type: String,
        required: true,
        match: [/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "password doesn't match the criteria"]
    },

    accessToken: {
        type: String
    },

    refreshToken: {
        type: String
    }

}, { timestamps: true })

export const User = mongoose.model('User', userSchema);