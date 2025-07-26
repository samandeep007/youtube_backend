import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'; //fs stands for fileSystem, it is used to delete the file once uploaded
import { cloudinary_options } from '../constants.js';

cloudinary.config(cloudinary_options);


export default async function uploadOnCloudinary(localFilePath) {
    try {
        //If file doesn't exist return null
        if (!localFilePath) return null;

        console.log(cloudinary_options)

        //upload the file on cloudinary: cloudinary.uploader.upload(filePath, options)
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });

        //file has been uploaded successfully
        console.log("File has been uploaded on cloudinary successfully: ", response.url);

        // Delete local file after successful upload
        fs.unlinkSync(localFilePath);

        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation failed
        return null;
    }
}