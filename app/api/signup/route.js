import {connect} from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);

        //check if user already exists
       const user = await UserModel.findOne({email})



        if(user){
           return NextResponse.json({error: "User already exists"}, {status: 400})
        }

         //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

       const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(`SavedUser : ${savedUser._id}`);

       const userIDx = savedUser._id.toString()
        console.log(userIDx)
        //send verification email

        await sendEmail({email, emailType: "VERIFY", userId: userIDx})  
     
       
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error) {
        return NextResponse.json({errorIs: error.message}, {status: 500})

    }
}