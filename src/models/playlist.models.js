import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video',
            required: true
        }
    ],

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

export const Playlist = mongoose.model('Playlist', playlistSchema);