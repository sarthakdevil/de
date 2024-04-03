import Card from "../model/card.config.js";
import Player from "../model/user.config.js";
import crypto from  'crypto';
export async function isCorrect(cardNumber, ans) {
    try {
        // Assuming you have a Card model
        const card = await Card.findOne({ cardNumber: cardNumber }).select('+answer');

        if (!card) {
            console.log("Card not found");
            return false;
        }
        const hashedAnswer = crypto.createHash('sha256').update(ans).digest('hex');
        if (card.answer === hashedAnswer) {
            console.log("Answer is correct!");
            return true;
        } else {
            console.log("Answer is incorrect!");
            return false;
        }
    } catch (err) {
        console.error("Error finding card:", err);
        // Handle error
        return false;
    }
}

export async function increasePointsHandler(playerId) {
    try {
        // Assuming you have a Player model
        const player = await Player.findOneAndUpdate(
            { _id: playerId },
            { $inc: { points: 1 } },
            { new: true } // To return the updated document
        ).exec();

        if (!player) {
            console.error("Player not found");
            // Handle case where player is not found
            return;
        }

        console.log("Points updated successfully:", player.points);
        // Handle successful point increase
    } catch (error) {
        console.error("Error updating points:", error);
        // Handle error
    }
}