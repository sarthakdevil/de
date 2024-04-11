import { Router } from "express";
import { getQuestion, getsinglequestion, QuestionPanel } from "../controllers/question.controller.js";
import { upload } from "../helpers/multer.js";
import { questionalreadycompleted } from "../middleware/isquestioncompleted.js";
import isLoggedIn from "../middleware/isloggedin.js";

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
questionrouter.route("/get").get(isLoggedIn,getQuestion);
questionrouter.route("/getone/:number").get(isLoggedIn,questionalreadycompleted,previousquestioncompleted,getsinglequestion)
export default questionrouter;
