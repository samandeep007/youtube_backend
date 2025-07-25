import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    videoFile: {
        type: String,
        required: true
    },

    thumbnail: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    duration: {
        type: Number,
        required: true,
        default: 0
    },

    views: {
        type: Number,
        required: true,
        default: 0
    },

    isPublished: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })

export const Video = mongoose.model('Video', videoSchema);