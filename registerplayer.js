import Player from "./config/user.config.js";
import bcrypt from 'bcryptjs';
import fs from 'fs';
import csv from 'csv-parser';
import { sendMail } from './utils/mailer.js'; // Import sendMail function from appropriate file

async function registerPlayersFromCSV(csvPath) {
    try {
        // Read the CSV file
        await new Promise((resolve, reject) => {
            fs.createReadStream(csvPath)
                .pipe(csv())
                .on('data', async (data) => {
                    // Extract email, schoolName, and graduationYear from CSV row
                    const email = data.email;
                    const schoolName = data.schoolName;
                    const graduationYear = data.graduationYear;

                    // Generate a random password
                    const password = Math.random().toString(36).slice(-8); // Adjust length as needed

                    // Hash the password
                    const hashedPassword = await bcrypt.hash(password, 10);

                    // Create a new Player document and save it to the database
                    const player = new Player({
                        email,
                        schoolName,
                        graduationYear,
                        password: hashedPassword
                    });
                    console.log(player)
                    await player.save();

                    //send mail 
                    await sendMail(email, password, schoolName, graduationYear);
                })
                .on('end', () => resolve());
        });

        return { message: 'Players registered successfully' };
    } catch (error) {
        throw error;
    }

}

registerPlayersFromCSV("./Decadisaster.csv")