import Card from '../config/card.config.js'; 
import { pointhandler } from './auth.controller.js';

export const cards = async (req, res, next) => {
    try {
        // Query all cards from the database
        const allCards = await Card.find();

        res.status(200).json(allCards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};