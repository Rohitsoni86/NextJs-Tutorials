import { NextResponse } from "next/server";


export async function GET() {
    try{

        const response = NextResponse.json(
            {
                message:"Logout Successful",
                success:true,
            }
        )

        response.cookies.set("token","", {
            httpOnly:true,
            expires:new Date(0)
        })

        return response;


    }catch(err){
       console.log(err);
       return NextResponse.json({
        errorMsg:err.message
       },
       {status:500}
       )

    }
    finally{
        console.log("Logout Success Fully !!!");
    }
}