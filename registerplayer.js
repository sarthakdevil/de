import Player from "./model/user.config.js";
import fs from 'fs';
import csvParser from 'csv-parser';
import bcrypt from 'bcryptjs';

async function registerPlayersFromCSV(csvPath, outputPath) {
    try {
        const outputStream = fs.createWriteStream(outputPath);
        outputStream.write("fullname,email,password\n"); // Write the header to the CSV file

        const promises = [];

        const parser = fs.createReadStream(csvPath).pipe(csvParser());

        parser.on('data', async (data) => {
            try {
                // Extract fullname and email from CSV row
                const { fullname, email } = data;

                // Generate a random password
                const password = Math.random().toString(36).slice(-25); // Adjust length as needed

                // Write player details to the CSV file
                outputStream.write(`${fullname},${email},${password}\n`);

                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Check if the email already exists in the database
                const existingPlayer = await Player.findOne({ email });

                if (existingPlayer) {
                    console.log(`Player with email ${email} already exists.`);
                } else {
                    // Save player details to the database
                    const player = new Player({
                        fullname,
                        email,
                        password: hashedPassword
                    });

                    promises.push(player.save());
                }
            } catch (error) {
                console.error(error);
            }
        });

        parser.on('end', () => {
            outputStream.end(() => {
                Promise.all(promises)
                    .then(() => {
                        console.log({ message: 'Players registered and details saved to CSV successfully' });
                        // Resolve the function after all promises have resolved
                        return { message: 'Players registered and details saved to CSV successfully' };
                    })
                    .catch(error => {
                        console.error(error);
                        throw error; // Re-throw the error to be caught by the outer catch block
                    });
            });
        });

        outputStream.on('error', (error) => {
            console.error(error);
        });
    } catch (error) {
        throw error;
    }
}

registerPlayersFromCSV("./Decadisaster.csv", "./playerDetails.csv")
    .then(result => console.log(result))
    .catch(error => console.error(error));
