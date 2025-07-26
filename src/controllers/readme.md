## Controllers
This will contain all the project logic

## RegisterUser.controller.js
1. get all the form fields from the req.body
2. Check for the null values
3. If there is any null value, throw appropriate error
4. Check if an user exists with same username or email
5. If there is any existing user, throw error
6. Check for the avatar file
7. if avatar file exists, obtain it's path and store it inside a variable
8. Upload the avatar to cloudinary
9. check if the upload to cloudinary was successful
10. Create a new user
11. Get the newly created user details except the password field
12. If user doesn't exist throw error
13. return the response


