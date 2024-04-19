import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.Folder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

export const deleteFile = async (filePath) => {
  try {
    fs.unlinkSync(filePath);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};
export const upload = multer({
  limits: { fileSize: 20 * 1024 * 1024 },
  storage,
});
