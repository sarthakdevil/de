import Player from '../model/user.config.js'; // Import your Player model

export const isAdmin = async (email) => {
    try {
        // Find the player with the provided email
        const player = await Player.findOne({ email });

        // Check if player exists and is an admin
        if (player && player.Usertype === 'admin') {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error checking admin status:", error);
        return false; // Return false in case of any errors
    }
};
