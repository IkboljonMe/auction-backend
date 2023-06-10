import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const uploadFileCloudinary = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  try {
    const result = await streamUpload(req);
    res.send(result);
  } catch (error) {
    console.error("Error occurred during image upload:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

export default uploadFileCloudinary;
