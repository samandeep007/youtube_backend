import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import {User} from '../models/user.models.js';

const registerUser = asyncHandler(async (req, res) => {
    //extract form fields from the request body
    const {fullName, username, email, password} = req.body;
    
    //Check if any value is null
    if([fullName, username, email, password].some((field => !field))){
        throw new ApiError(400, "All fields are required. Try again!");
    }

    //check if the user with same username or email exists
    const existingUser = await User.findOne({$or: [{email}, {username}]})

    //if the user exists, throw error
    if(existingUser){
        throw new ApiError(400, "User with same credentials already exists");
    }

    //get the avatar path
    const localFilePath = req?.file.path;

    //Upload the avatar file to cloudinary
    const avatar = await uploadOnCloudinary(localFilePath);
    
    //Check if the uploadOnCloudinary was successful
    if(!avatar){
       throw new ApiError(500, "Unable to upload avatar image to cloudinary"); 
    }
    
    //Create a new user
    await User.create({
        fullName: fullName,
        username: username,
        email: email,
        password: password,
        avatar: avatar.url
    })

    //get the registered user
    const registeredUser = await User.findOne({email: email}).select('-password');

    //Check if the user was created or not
    if(!registeredUser){
        throw new ApiError(500, "User registration failed");
    }

    //return the response
    res.status(200)
       .json(new ApiResponse(200, "User registered successfully!", registeredUser));
})


export {registerUser};