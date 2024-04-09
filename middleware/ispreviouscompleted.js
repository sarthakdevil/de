import Player from "../model/user.config";// Assuming you have a Player model

const ispreviouscompleted = async () => {
    const card_number = req.params.card_number
    const _id = req.user._id;
    
    try {
        // Find the player by _id
        const player = await Player.findById(_id);
        if (!player) {
            // If player not found, return false
            return false;
        }

        // Check if the value of cardcompleted is cardnumber - 1
        return player.cardcompleted === cardnumber - 1;
    } catch (error) {
        console.error(error);
        // In case of error, return false
        return false;
    }
};

module.exports = ispreviouscompleted;
