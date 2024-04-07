import Card from "../model/card.config";
import Player from "../model/user.config";

export const iscardcompleted = async () => {
    try {
        // Get the number of questions from the card
        const card = await Card.findOne({ card_number });
        const numQuestionsInCard = card.questions.length;

        // Get the number of questions completed by the player
        const player = await Player.findOne({ playerId });
        const numQuestionsCompletedByPlayer = player.questionsCompleted.length;

        // Check if both values are the same
        return numQuestionsInCard === numQuestionsCompletedByPlayer;
    } catch (error) {
        console.error('Error:', error);
        return false; // Return false in case of any error
    }
};