import Card from "../model/card.config.js";
import Player from "../model/user.config.js";

export const iscardcompleted = async (playerId,card_number) => {
    try {
        console.log(playerId)
        console.log(card_number)
        // Get the number of questions from the card
        const card = await Card.findOne({ card_number : card_number });
        console.log(card)
        const numQuestionsInCard = card.noofquestions;
        console.log(numQuestionsInCard)
        // Get the number of questions completed by the player
        const player = await Player.findOne({ _id : playerId });
        const numQuestionsCompletedByPlayer = player.questionscompleted;
        console.log(numQuestionsCompletedByPlayer)
        if(numQuestionsInCard == numQuestionsCompletedByPlayer){
            console.log("hogya")
            return true
    }
    else{
        console.log("nhi hua")
        return false
    }
    } catch (error) {
        console.error('Error:', error);
        return false; // Return false in case of any error
    }
};