import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import uploadOnCloudinary from '../utils/cloudinary.js';

const registerUser = asyncHandler(async (req, res) => {
    // const {fullName, username, email, password} = req.body;
    // if([fullName, username, email, password].some((field => !field))){
    //     throw new ApiError(400, "All fields are required. Try again!");
    // }

    return res.status(200).json({message: 'ok'})
            //   .json(new ApiResponse(200, "User registered successfully!", registeredUser));
})

export {registerUser};