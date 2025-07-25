import {app} from './src/app.js';
import dbConnect from './src/db/index.js';
import 'dotenv/config';


dbConnect().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is listening on port ${process.env.PORT || 8000}`);
    });

    app.on('error', () => {
        console.error("Server failed to connect ", error);
    })
}).catch((err) => {
    console.log("MongoDB connection failed !!! ", err);
});