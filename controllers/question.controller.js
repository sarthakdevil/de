// Corrected filename
import path from "path";
import { dirname, join } from "path";
import { uploadFileToGitHub } from "../helpers/github-upload.js";
import { Question } from "../model/queation.config.js";
import { fileURLToPath } from "url";
import fs from "fs";
import { deleteFile } from "../helpers/multer.js";

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

  if (!cardnumber || !question_type) {
    return resp.status(400).json({ message: "Missing fields!" });
  }

  if (question_type == "text") {
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

    //TODO IMAge
  } else if (question_type === "image" || question_type == "image_options") {
    try {
      // Extract the paths of the uploaded question text and options images
      const question_image = req.files?.question_image[0]?.path;

      const answer_image =
        req.files && req.files.answer && req.files.answer[0]
          ? req.files.answer[0].path
          : [];

      const options_images = req.files?.options
        ? req.files.options.map((option) => option.path)
        : [];

      console.log(options_images);
      // Validate the question image and options images file formats
      if (!isImageFile(question_image)) {
        return resp.status(400).json({
          message: "Invalid image file format for the question or options.",
        });
      }

      console.log(question_image);

      const uploadedQuestionImage = await uploadFileToGitHub(question_image);

      console.log(uploadedQuestionImage);
      if (options_images.length > 0 || answer_image.length > 0) {
        const uploadedOptionsImages = [];

        const answer_Uploaded = await uploadFileToGitHub(answer_image);
        const answer_url = answer_Uploaded.data.content.html_url;

        console.log("Answer image:", answer_url);

        // Upload each option image to GitHub one by one
        for (const optionImage of options_images) {
          const uploadedOptionImage = await uploadFileToGitHub(optionImage);
          uploadedOptionsImages.push(uploadedOptionImage.data.content.html_url);
          console.log(
            "Option Image uploaded:",
            uploadedOptionImage.data.content.html_url,
          );
        }

        const questiondb = new Question({
          question_text: question_type,
          question_image: uploadedQuestionImage.data.content.html_url,
          options: uploadedOptionsImages,
          question_type: "image_options",
          card_number: cardnumber,
          answer: answer_url,
        });

        // Save the question to the database
        await questiondb.save();

        if (options_images) {
          for (const option_one of options_images) {
            await deleteFile(option_one);
          }
        }
        if (answer_image) {
          await deleteFile(answer_image);
        }
        await deleteFile(question_image);

        return resp.status(200).json({ message: "Question Uploaded!" });
      }

      // Upload the question image to GitHub
      console.log(
        "Question Image uploaded:",
        uploadedQuestionImage.data.content.html_url,
      );

      // Create a new Question document with the question and options image URLs
      const questiondb = new Question({
        question_text: question_text,
        question_image: uploadedQuestionImage.data.content.html_url,
        options: options,
        question_type: question_type,
        card_number: cardnumber,
        answer: answer,
      });

      // Save the question to the database
      await questiondb.save();
      await deleteFile(question_image);

      return resp.status(200).json({ message: "Question Uploaded!" });
    } catch (error) {
      console.error("Error uploading question:", error);
      return resp.status(500).json({ message: "Internal server error" });
    }
  } else if (question_type == "video" || question_type == "video_options") {
    try {
      // Extract the paths of the uploaded question text and options images
      const question_image = req.files?.question_image[0]?.path;
      const answer_image =
        req.files && req.files.options.length > 0
          ? req.files?.answer[0]?.path
          : [];
      const options_images =
        req.files && req.files.options && req.files.options.length > 0
          ? req.files.options.map((option) => option.path)
          : [];

      // Validate the question image and options images file formats
      if (!isVideoFile(question_image)) {
        return resp.status(400).json({
          message: "Invalid video file format for the question or options.",
        });
      }

      const uploadedQuestionImage = await uploadFileToGitHub(question_image);

      if (options_images || answer_image) {
        const uploadedOptionsImages = [];

        const answer_Uploaded = await uploadFileToGitHub(answer_image);
        const answer_url = answer_Uploaded.data.content.html_url;

        console.log("Answer image:", answer_url);

        // Upload each option image to GitHub one by one
        for (const optionImage of options_images) {
          const uploadedOptionImage = await uploadFileToGitHub(optionImage);
          uploadedOptionsImages.push(uploadedOptionImage.data.content.html_url);
          console.log(
            "Option Image uploaded:",
            uploadedOptionImage.data.content.html_url,
          );
        }

        const questiondb = new Question({
          question_text: question_text,
          question_image: uploadedQuestionImage.data.content.html_url,
          options: uploadedOptionsImages,
          question_type: "video_options",
          card_number: cardnumber,
          answer: answer_url,
        });

        // Save the question to the database
        await questiondb.save();

        return resp.status(200).json({ message: "Question Uploaded!" });
      }

      // Upload the question image to GitHub
      console.log(
        "Question Image uploaded:",
        uploadedQuestionImage.data.content.html_url,
      );

      // Create a new Question document with the question and options image URLs
      const questiondb = new Question({
        question_text: question_text,
        question_image: uploadedQuestionImage.data.content.html_url,
        options: options,
        question_type: question_type,
        card_number: cardnumber,
        answer: answer,
      });

      // Save the question to the database
      await questiondb.save();
      if (options_images) {
        for (const option_one of options_images) {
          await deleteFile(option_one);
        }
      }
      if (answer_image) {
        await deleteFile(answer_image);
      }
      await deleteFile(question_image);

      return resp.status(200).json({ message: "Question Uploaded!" });
    } catch (error) {
      console.error("Error uploading question:", error);
      return resp.status(500).json({ message: "Internal server error" });
    }
  } else if (question_type == "audio" || question_type == "audio_options") {
    try {
      // Extract the paths of the uploaded question text and options images
      const question_image = req.files?.question_text[0]?.path;
      const answer_image =
        req.files && req.files.options.length > 0
          ? req.files?.answer[0]?.path
          : [];
      const options_images =
        req.files && req.files.options && req.files.options.length > 0
          ? req.files.options.map((option) => option.path)
          : [];

      // Validate the question image and options images file formats
      if (!isAudioFile(question_image)) {
        return resp.status(400).json({
          message: "Invalid image file format for the question or options.",
        });
      }

      const uploadedQuestionImage = await uploadFileToGitHub(question_image);

      if (options_images || answer_image) {
        const uploadedOptionsImages = [];

        const answer_Uploaded = await uploadFileToGitHub(answer_image);
        const answer_url = answer_Uploaded.data.content.html_url;

        console.log("Answer image:", answer_url);

        // Upload each option image to GitHub one by one
        for (const optionImage of options_images) {
          const uploadedOptionImage = await uploadFileToGitHub(optionImage);
          uploadedOptionsImages.push(uploadedOptionImage.data.content.html_url);
          console.log(
            "Option Image uploaded:",
            uploadedOptionImage.data.content.html_url,
          );
        }

        const questiondb = new Question({
          question_text: question_text,
          question_image: uploadedQuestionImage.data.content.html_url,
          options: uploadedOptionsImages,
          question_type: "audio_options",
          card_number: cardnumber,
          answer: answer_url,
        });

        // Save the question to the database
        await questiondb.save();
        await questiondb.save();
        if (options_images) {
          for (const option_one of options_images) {
            await deleteFile(option_one);
          }
        }
        if (answer_image) {
          await deleteFile(answer_image);
        }
        await deleteFile(question_image);

        return resp.status(200).json({ message: "Question Uploaded!" });
      }

      // Upload the question image to GitHub
      console.log(
        "Question Image uploaded:",
        uploadedQuestionImage.data.content.html_url,
      );

      // Create a new Question document with the question and options image URLs
      const questiondb = new Question({
        question_text: question_text,
        question_image: uploadedQuestionImage.data.content.html_url,
        options: options,
        question_type: question_type,
        card_number: cardnumber,
        answer: answer,
      });

      // Save the question to the database
      await questiondb.save();
      await deleteFile(question_image);
      return resp.status(200).json({ message: "Question Uploaded!" });
    } catch (error) {
      console.error("Error uploading question:", error);
      return resp.status(500).json({ message: "Internal server error" });
    }
  }
};
export const getQuestion = async (req, resp, next) => {
  let { card_number } = req.params;
  card_number = parseInt(card_number);
  if (!card_number) {
    return resp.status(400).json({ message: "Missing Fields" });
  }

  const data = await Question.find({ card_number: card_number }).select("-_id");

  if (!data) {
    return resp.status(400).json({ message: "Card Does not exist" });
  }

  return resp.status(200).json({ message: data });
};

export const getsinglequestion = async (req, res, next) => {
  try {
    let question_number = req.params.number;
    question_number = parseInt(question_number);
    // Find the question from the database by question_number
    const question = await Question.findOne({
      questionId: question_number,
    }).select("-answer");

    if (!question) {
      // If question not found, return 404 Not Found
      return res.status(404).json({ message: "Question not found" });
    }

    // Return the question as response
    res.status(200).json({ question });
  } catch (error) {
    console.error("Error getting single question:", error);
    res.status(500).send("Internal Server Error");
  }
};
