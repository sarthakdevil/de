import mongoose from "mongoose";
import connectDB from "../config/db.config.js";

connectDB();

const QuestionSchema = new mongoose.Schema({
  questionId: {
    type: Number,
  },

  question_text: {
    type: String,
    required: false,
  },

  question_type: {
    type: String,
    required: [true, "Question type is required"],
    enum: ["video", "image", "audio", "text"],
  },

  options: {
    type: [String],

    options: ["option1", "option2", "option3", "option4"],
  },

  card_number: {
    type: Number,
    required: [true, "provide card number for this question"],
  },

  answer: {
    type: String,
    required: [true, "Answer is required"],
  },
});

QuestionSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next(); // If not a new document, do nothing
  }

  try {
    const highestQuestion = await this.constructor
      .findOne()
      .sort("-questionId");
    if (highestQuestion) {
      this.questionId = highestQuestion.questionId + 1;
    } else {
      this.questionId = 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

export const Question = mongoose.model("Question", QuestionSchema);
