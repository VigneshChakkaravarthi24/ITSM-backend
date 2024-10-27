// utils/sendEmail.js

const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function sendEmail(ticketID, userEmail, userName) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, // Use environment variables for security
            pass: process.env.EMAIL_PASS
        },
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false // Only use if confident in SMTP server security
        }
    });

    // Prepare email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail, // Now using the function argument `userEmail`
        subject: 'Ticket Created Successfully',
        text: `Dear ${userName},\n\nYour ticket has been created successfully. Your ticket ID is ${ticketID}.\n\nBest regards,\nYour Support Team`
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        return true
        console.log(`Email sent to ${userEmail}`);
    } catch (error) {
        console.error(`Error sending email to ${userEmail}:`, error);
        return false
    }
}

module.exports = sendEmail;
