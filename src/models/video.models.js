import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new Schema({
    videoFile: {
        type: String, //Cloudinary URL 
        required: true
    },

    thumbnail: {
        type: String,
        required: [true, "Thumbnail is required"]
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
        type: Number, //From cloudinary
        required: true
    },

    views: {
        type: Number,
        default: 0
    },

    isPublished: {
        type: Boolean,
        default: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true });

videoSchema.plugin(mongooseAggregatePaginate())

export const Video = mongoose.model('Video', videoSchema);