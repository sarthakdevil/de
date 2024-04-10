import Player from "../model/user.config.js"; // Assuming you have a Player model

export const questionalreadycompleted = async (req, res, next) => {
    try {
        const playerId = req.user._id; // Assuming you're extracting _id from user object in the request
        const questionNumber = req.params.question_number;

        // Find the player by _id
        const player = await Player.findById(playerId);
        if (!player) {
            return res.status(404).json({ success: false, message: 'Player not found' });
        }

        // Check if questionscompleted is equal to the question number
        if (player.questionscompleted === questionNumber) {
            return res.status(400).json({ success: false, message: 'Question already completed' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

