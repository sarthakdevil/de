import { Router } from "express";
import {
  getQuestion,
  getsinglequestion,
  QuestionPanel,
} from "../controllers/question.controller.js";
import { upload } from "../helpers/multer.js";
import { questionalreadycompleted } from "../middleware/isquestioncompleted.js";
import isLoggedIn from "../middleware/isloggedin.js";

const questionrouter = Router();

questionrouter.route("/question").post(
  isLoggedIn,
  upload.fields([
    {
      name: "question_image",
      maxCount: 1,
    },
    {
      name: "options",
      maxCount: 4,
    },

    {
      name: "answer",
      maxCount: 1,
    },
  ]),
  QuestionPanel,
);
questionrouter.route("/get/:card_number").get(isLoggedIn, getQuestion);
questionrouter
  .route("/getone/:number")
  .get(isLoggedIn, questionalreadycompleted, getsinglequestion);
export default questionrouter;
