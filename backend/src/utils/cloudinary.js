import { v2 as Cloudinary } from "./cloudinary";
import fs from "fs";

Cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_API_KEY,
});

export const uploadImage = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const upload = await Cloudinary.uploader.upload(localFilePath, {
      resourceType: "image",
    });
    console.log("Image uploaded successfully", upload.secure_url);
    fs.unlinkSync(localFilePath);
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.error("failed to upload", error);
  }
};

export const deleteImage = async (public_id) => {
  if (!localFilePath) return null;

  try {
    await Cloudinary.uploader.distroy(public_id);
  } catch (error) {
    console.error("failed to delete", error);
  }
};
