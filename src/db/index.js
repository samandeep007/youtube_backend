import mongoose from 'mongoose';

export default async function dbConnect(){
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DBName}`, () => {
            console.log("MongoDB connected successfully");
        })
    } catch (error) {
        console.error("MongoDB connection failed")
    }
}