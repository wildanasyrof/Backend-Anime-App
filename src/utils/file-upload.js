import multer from "multer";
import {ResponseError} from "./response-error.js";
import * as fs from "node:fs";

const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const allowedFileTypes = ["image/jpeg", "image/png"];

export const multerUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/"); // Specify your upload folder
        },
        filename: (req, file, cb) => {
            // Generate a random file name using Date.now() and Math.random()
            const randomName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const fileExtension = file.originalname.split(".").pop(); // Extract file extension
            cb(null, `${randomName}.${fileExtension}`); // Combine random name with file extension
        },
    }),
    fileFilter: (req, file, cb) => {
        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true); // Accept the file
        } else {
            cb(
                new ResponseError(400,"Invalid file type. Only JPEG and PNG files are allowed."),
                false
            ); // Reject the file
        }
    },
    limits: {
        fileSize: 3 * 1024 * 1024, // Limit file size to 2MB
    },
});