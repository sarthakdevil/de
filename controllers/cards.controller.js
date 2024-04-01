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

export const create = async (req, res, next) => {
    try {
        const { card_number, question_Url, instruction, answer } = req.body;
        
        // Check if any required field is missing
        if (!card_number || !question_Url || !instruction || !answer) {
            return res.status(400).json({ message: "Missing fields!" });
        }
        
        // Check if a card with the same card_number already exists
        const existingCard = await Card.findOne({ card_number });
        if (existingCard) {
            return res.status(400).json({ message: "Card already exists!" });
        }
        
        // Create a new card document
        const card = new Card(req.body);
        await card.save();
        
        res.status(201).json(card);
    } catch (err) {
        console.log("Error in saving a card to DB:", err);
        next(err);
    }
};

export const getcardbyCard_number = async(req,res)=>{
    const id = req.params.card_number
    if (!Card.validateID(id))return res.status(400).send('Invalid Id')
    const card=await Card.findOne(card_number)
    if(!card) res.status(404).send('The card does not exist')

    else res.status(200).send(card)
}
