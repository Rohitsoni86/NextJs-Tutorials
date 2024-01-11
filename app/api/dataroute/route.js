import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";

connect()

export async function GET(request) {
    try{
        const userEmail = await getDataFromToken(request)

        console.log(userEmail);

       const userDetails = await UserModel.findOne({
            email:userEmail
        }).select("-password")

        console.log(userDetails);

        return NextResponse.json({
            message:"user Found",
            data:userDetails
        })


   
    }catch(err){
        return NextResponse.json({errorMessage:err.message})  
    }
    finally{
        console.log("Requested User Data !!");
    }
}

