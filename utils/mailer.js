import nodemailer from 'nodemailer'

export const sendMail = async (email, password, schoolName, graduationYear) => {
    try {
        // Create a nodemailer transporter
        const transporter = nodemailer.createTransport({
            // Configuration for sending emails (e.g., SMTP settings)
            // You can use your email provider's SMTP settings here
            host: 'smtp.example.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'your-email@example.com',
                pass: 'your-password'
            }
        });

        // Mail options
        const mailOptions = {
            from: 'your-email@example.com',
            to: email,
            subject: 'Account Details',
            html: `
                <p>Hello,</p>
                <p>Your account has been successfully created.</p>
                <p>Email: ${email}</p>
                <p>Password: ${password}</p>
                <p>School Name: ${schoolName}</p>
                <p>Graduation Year: ${graduationYear}</p>
            `
        };

        // Send mail
        await transporter.sendMail(mailOptions);

        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
