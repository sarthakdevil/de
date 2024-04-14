import Player from "../model/user.config.js";

export const ispreviousquestioncompleted = async (req, res, next) => {
  const questionId = req.params.question_number;
  const playerId = req.user._id;
  const player = await Player.findById({ _id: playerId });
  if (player.totalquestionscompleted == questionId - 1) {
    next();
  } else if (player.totalquestionscompleted >= questionId) {
    res.send("Can't Attempt Same Question Again");
  } else {
    res.send("Please Follow the Order");
  }
};
