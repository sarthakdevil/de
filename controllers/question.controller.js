// Corrected filename
import path from "path";
import { dirname, join } from "path";
import { uploadFileToGitHub } from "../helpers/github-upload.js";
import { Question } from "../model/queation.config.js";
import { fileURLToPath } from "url";
import fs from "fs";

function isVideoFile(filepath) {
  const videoExtensions = [
    ".mp4",
    ".mov",
    ".avi",
    ".wmv",
    ".mkv",
    ".flv",
    ".webm",
    ".m4v",
    ".mpeg",
  ];
  const ext = path.extname(filepath).toLowerCase();
  return videoExtensions.includes(ext);
}
function isImageFile(filepath) {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"];
  const ext = path.extname(filepath).toLowerCase();
  return imageExtensions.includes(ext);
}
function isAudioFile(filepath) {
  const audioExtensions = [
    ".mp3",
    ".wav",
    ".aac",
    ".ogg",
    ".flac",
    ".m4a",
    ".wma",
    ".alac",
  ];
  const ext = path.extname(filepath).toLowerCase();
  return audioExtensions.includes(ext);
}

export const QuestionPanel = async (req, resp, next) => {
  const { question_text, question_type, cardnumber, options, answer } =
    req.body;

  if (!answer || !cardnumber || !question_type) {
    return resp.status(400).json({ message: "Missing fields!" });
  }

  if (question_type == "text") {
    if (!options) {
      return resp.status(400).json({ message: "Missing fields!" });
    }
    const questiondb = new Question({
      question_text: question_text,
      question_type: question_type,
      card_number: cardnumber,
      options: options,
      answer: answer,
    });

    try {
      await questiondb.save();
      return resp.status(200).json({ message: "Question Uploaded!" });
    } catch (error) {
      console.error("Error uploading question:", error);
      return resp.status(500).json({ message: "Internal server error" });
    }
  } else if (question_type == "image") {
    const question_image = req.files?.question_text[0]?.path;

    try {
      if (!isImageFile(question_image)) {
        return resp.status(400).json({
          message: "Invalid video file format. Must be an image file.",
        });
      }

      const uploaded_img = await uploadFileToGitHub(question_image);

      const imageUrl = uploaded_img.data.content.html_url;

      const questiondb = new Question({
        question_text: imageUrl,
        question_type: question_type,
        card_number: cardnumber,
        answer: answer,
      });

      await questiondb.save();

      return resp.status(200).json({ message: "Question Uploaded!" });
    } catch (error) {
      console.error("Error uploading question:", error);
      return resp.status(500).json({ message: "Internal server error" });
    }
  } else if (question_type == "video") {
    const question_image = req.files?.question_text[0]?.path;

    try {
      if (!isVideoFile(question_image)) {
        return resp.status(400).json({
          message: "Invalid video file format. Must be a video file.",
        });
      }
      const uploaded_img = await uploadFileToGitHub(question_image);

      const imageUrl = uploaded_img.data.content.html_url;

      const questiondb = new Question({
        question_text: imageUrl,
        question_type: question_type,
        card_number: cardnumber,
        answer: answer,
      });

      await questiondb.save();

      return resp.status(200).json({ message: "Question Uploaded!" });
    } catch (error) {
      console.error("Error uploading question:", error);
      return resp.status(500).json({ message: "Internal server error" });
    }
  } else if (question_type == "audio") {
    const question_image = req.files?.question_text[0]?.path;

    try {
      if (!isAudioFile(question_image)) {
        return resp.status(400).json({
          message: "Invalid video file format. Must be an audio file.",
        });
      }

      const uploaded_img = await uploadFileToGitHub(question_image);

      const imageUrl = uploaded_img.data.content.html_url;

      const questiondb = new Question({
        question_text: imageUrl,
        question_type: question_type,
        card_number: cardnumber,
        answer: answer,
      });

      await questiondb.save();

      return resp.status(200).json({ message: "Question Uploaded!" });
    } catch (error) {
      console.error("Error uploading question:", error);
      return resp.status(500).json({ message: "Internal server error" });
    }
  }
};
