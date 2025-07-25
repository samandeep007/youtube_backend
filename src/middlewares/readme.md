## Middleware
Jaane se pehle mujhse milkar jaana

In production grade applications, we usually upload the files using multer or express-fileupload, and then we keep that file temporarily on our machine until it gets uploaded to some cloud storage. Once, the file is uploaded to that cloud service, we remove the file from our file system. This is usually done to improve the user experience. It allows the server to make multiple attempts until the upload is successful, it doesn't need to ask the user to upload the file each time it attempts the upload.

- Two Steps:
1. Upload on multer --> fileSystem
2. Upload on cloudinary
3. Remove from fileSystem

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})