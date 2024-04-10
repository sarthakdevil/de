import Player from "../model/user.config.js"
import bcrypt from 'bcryptjs'
import { matchans } from "../helpers/iscorrect.js";
import { iscardcompleted } from "../helpers/iscompleted.js";
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Missing credentials" });
        }

        const user = await Player.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

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

 export const answer = async (req,res)=>{
    const playerId = req.user._id
    const question_number= req.params.question_number
    let answer = req.body.answer;
    let card_number = req.body.card_number
    answer= answer.toLowerCase();
    Player.updateOne( { _id: playerId }, { $inc: { questionscompleted: 1 } })
    const matched = await matchans(question_number,answer)
    const completed = iscardcompleted(playerId,card_number)

    if (!completed){

    }else{
        await Player.updateOne(
            { _id: playerId },
            { $inc: { cardcompleted: 1 }, $set: { questionscompleted: 0 } }
        );
    }
    if (!matched) {
                // Find player by playerId and increase point by 1
                await Player.updateOne(
                    { _id: playerId },
                    { $inc: { point: 1 } }
                )
}
}