import Player from "../config/user.config.js"
import bcrypt from 'bcryptjs'
import { decodeToken } from "../helpers/helper.js";
import { increasePointsHandler, isCorrect } from "../middleware/iscorrect.js";

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Missing credentials" });
        }

        const user = await Player.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const validPassword = bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        const token = user.generateAuthToken();

        res.cookie('token', token, { 
            httpOnly: true,//csrf protection
            maxAge: 7200000 // 2 hour in milliseconds
        });
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}; 

export const logout = (req, res) => {
    // Clear token cookie by setting its expiration time to a past date
    res.cookie('token', '', { expires: new Date(0), httpOnly: true });

    res.status(200).json({ message: "Logout successful" });
};

export const isattempted = async (req, res) => {
    const ans = req.body.ans;
    const token = req.headers.authorization; // Assuming JWT is sent in the authorization header

    if (!token) {
        console.log("No JWT provided");
        // Handle case where no JWT is provided
        return;
    }

    try {
        // Extract player information from JWT
        const playerinfo = decodeToken(token);
        const playerId = playerinfo.payload.playerId; // Assuming playerId is stored in the token payload

        if (!playerId) {
            console.log("No playerId found in JWT");
            // Handle case where playerId is not found in the JWT payload
            return;
        }

        // Assuming you have a Player model
        const player = await new Promise((resolve, reject) => {
            Player.findOneAndUpdate(
                { _id: playerId },
                { $inc: { isattempted: 1 } },
                { new: true }, // To return the updated document
                (err, player) => {
                    if (err) {
                        console.error("Error updating isattempted:", err);
                        reject(err);
                    } else {
                        console.log("isattempted updated successfully:", player.isattempted);
                        resolve(player);
                    }
                }
            );
        });

        // Call your separate function for checking correctness
        const correct = isCorrect(player.isattempted, ans);
        if (correct) {
            await increasePointsHandler(playerId);
        }
    } catch (error) {
        console.error("Error in isattempted:", error);
        // Handle error
    }
};