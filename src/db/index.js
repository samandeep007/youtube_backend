import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

//Always start IIFEs with a semicolon
/*
; (async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        app.on('error', (error) => {
            console.log("ERROR: ", error);
            throw error;
        });
        app.listen(process.env.PORT || 3000, () => {
            console.log(`App is listening on port ${process.env.PORT || 3000}`);
        })
    } catch (err) {
        console.error("ERROR: ", err);
        throw err;
    }
})();
*/


export default async function dbConnect() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        // Log success message when connection is established
        console.log(`✅ MongoDB connected! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed: ", error.message);
        process.exit(1); //Node autonatically provides access to process, you can manually exit the process like this
    }
}