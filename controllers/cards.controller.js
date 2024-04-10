import Card from '../model/card.config.js'; 
import crypto from 'crypto';
import Player from '../model/user.config.js';

export const createCard = async (req, res, next) => {
    try {
        const { card_number, points, question_array, instruction, noofquestions } = req.body;

        // Validate data
        if (!card_number || !points || !question_array || !instruction || !noofquestions) {
            return res.status(400).json({ error: "Incomplete data" });
        }

        // Create a new Card instance
        const newCard = new Card({
            card_number,
            points,
            question_array,
            instruction,
            noofquestions
        });

        // Save the new card to the database
        await newCard.save();

        res.status(201).json({ message: "Card saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
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

export const getcardbyCard_number = async (req, res) => {

    const cardNumber = req.params.card_number; // Assuming card_number is a parameter in the URL
    const playerId = req.user._id
    console.log(playerId)
    try {

        // Find the player by ID
        const player = await Player.findById(playerId); // Assuming req.user._id holds the player's ID
        console.log(player.fullname)
        // If player not found, return 404
        if (!player) {
            return res.status(404).send('Player not found');
        }

        // Get the cardCompleted value from the player's data
        const cardCompleted = player.cardcompleted;

        // If cardNumber is not 1 and cardCompleted doesn't match cardNumber - 1, send message to complete previous card
        if (cardNumber !== '1' && cardCompleted !== String(cardNumber - 1)) {
            return res.status(403).send('Complete the previous card before accessing this one');
        }

        // Find the requested card
        const card = await Card.findOne({ card_number: cardNumber });

        // If the card doesn't exist, return 404
        if (!card) {
            return res.status(404).send('The card does not exist');
        }

        // Send the card details
        return res.status(200).send(card);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal Server Error');
    }
};
// Assuming you're defining this function within an Express route handler
export const getinstructions = async (req, res) => {
    try {
        const { card_number } = req.body; // Destructure card_number from req.body
        // Find a card by its card_number
        const card = await Card.findOne({ card_number });
        
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        
        // Extract instructions field from the card document
        const { instructions } = card;

        // Assuming you want to send the instructions as a response
        return res.status(200).json({ instructions });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
