import Card from "../model/card.config.js";
import Player from "../model/user.config.js";

export const iscardcompleted = async (card_number) => {
    try {
        // Get the number of questions from the card
        const card = await Card.findOne({ card_number });
        const numQuestionsInCard = card.noofquestions;

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