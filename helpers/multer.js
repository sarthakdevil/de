import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.FOLDER);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

export const upload = multer({
  limits: { fileSize: 20 * 1024 * 1024 },
  storage,
});
