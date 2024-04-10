import { Router } from "express";

import {
  QuestionPanel,
  getQuestion,
} from "../controllers/question.controller.js";
import { upload } from "../helpers/multer.js";

const r = Router();

r.route("/").post(
  upload.fields([
    {
      name: "question_text",
      maxCount: 1,
    },
  ]),
  QuestionPanel,
);

r.route("/get").post(getQuestion);

export default r;
