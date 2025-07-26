import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

// app.use() for using middlewares
//A middleware is a program that sits between the client and the server. All the requests have to successfully penetrate through middleware layer until they reach server
//the control passes from one middleware to the other using next flag
//The general signature of a middleware function has four params: err, req, res, next

//To receive the data from url --> Removes all the percentage signs and other polluting values --> It extracts the key-value pairs from the query string

/*A client (e.g., a webpage) sends a form via POST with URL-encoded data like username=John&email=john@example.com.
express.urlencoded() parses this into req.body as { username: "John", email: "john@example.com" }.
*/

app.use(express.urlencoded({
    limit: "16kb",
    extended: true
}));

//To receive the data from req body --> It converts the JSON string to javascript object so that we can play around with things and carry out our operations. 
app.use(express.json({
    limit: "16kb",
    extended: true
}))

//To parse the cookies from the user browser
app.use(cookieParser());

//cors --> Cross Origin Resource Sharing for security
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

//This is a built-in middleware function in Express. It serves static files and is based on serve-static.
app.use(express.static('public'));

//routes import
import userRouter from './routes/user.routes.js';

//routes declaration
app.use('/api/v1/users', userRouter); //Industry grade route

//http://localhost:3000/users/register --> here register comes from route file, users comes from app.js file middleware

export {app};