import { Router } from "express";
import { QuestionPanel } from "../controllers/question.controller.js";
import { upload } from "../helpers/multer.js";
import { questionalreadycompleted } from "../middleware/isquestioncompleted.js";

const questionrouter = Router();

questionrouter.route("/question").post(
  upload.fields([
    {
      name: "question_text",
      maxCount: 1,
    },
  ]),
  QuestionPanel,
);
export default questionrouter;
