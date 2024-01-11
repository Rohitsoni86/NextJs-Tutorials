import nodemailer from 'nodemailer';
import userModel from "@/models/userModel";
import bcryptjs from 'bcryptjs';
import mongoose from "mongoose";

export const sendEmail = async({email, emailType, userId}) => {
    try {

        console.log(email);
        console.log(emailType);
        console.log(userId);


        const userID = new mongoose.Types.ObjectId(userId);

        console.log(userID);
        

        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await userModel.findByIdAndUpdate({ _id: userID }, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await userModel.findByIdAndUpdate({ _id: userID }, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.Mailer_User,
              pass: process.env.Mailer_Pass //TODO: add these credentials to .env file
            }
          });


        const mailOptions = {
            from: 'rohitsoni@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        console.log(mailresponse);
        return mailresponse;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}