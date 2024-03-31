import Card from '../config/card.config.js'; 
import { increasePointsHandler } from '../middleware/iscorrect.js';

export const getcards = async (req, res, next) => {
    try {
        // Query all cards from the database
        const allCards = await Card.find();

        res.status(200).json(allCards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const create = async  (req, res) => {
    if (!req.body.card_number || question_Url || instruction || answer){

    }
}