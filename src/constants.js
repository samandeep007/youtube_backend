import 'dotenv/config';

export const DB_NAME = "youtube_clone";

export const cloudinary_options = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}