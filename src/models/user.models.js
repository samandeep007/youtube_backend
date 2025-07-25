import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; //To hash the password, and compare them
import jwt from 'jsonwebtoken'; //for token generation, protected by a secret

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
        trim: true,
        lowercase: true,
        unique: true,
        index: true //To make it searchable optimized
    },

    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email is not in the correct format."]
    },

    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    avatar: {
        type: String, //Cloudinary URL 
        required: true
    },

    coverImage: {
        type: String, //Cloudinary URL
        required: false
    },

    watchHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }],

    password: {
        type: String, //We will save the hashed (encrypted) password here
        required: [true, 'Password is required!']
    },

    refreshToken: {
        type: String
    }
}, { timestamps: true });

//Adding a save middleware that automatically encrypts the password when the password is updated
userSchema.pre('save', async function (next) { //Arrow functions don't have access to 'this' keyword, so we need to use traditional function here
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10); //(password, salt or rounds)
    next();
})

//Check the password 
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password); //(argument, hashedPassword)
}

/*
 * Access Token: A wristband that grants entry to a concert for the night (short-term access).
 * Refresh Token: A special pass used to get a new wristband when the old one expires, without buying a new ticket.
 */

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function(){ //We don't need async here
    return jwt.sign({
        _id: this._id
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}


/*
 jwt.sign({
  data: 'foobar'
 }, 'secret', { expiresIn: 60 * 60 });

*/


export const User = mongoose.model('User', userSchema);
