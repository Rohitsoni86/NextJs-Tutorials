
import jwt from "jsonwebtoken";


export const getDataFromToken = (request) => {

    try {
        const tokenData = request.cookies.get("token")?.value || ""
        const decodedToken = jwt.verify(tokenData, process.env.TOKEN_SECRET)

        console.log(decodedToken);

        return decodedToken.email

    } catch (err) {
        console.log(err);
        throw new Error(err.message)
    }
    finally {
        console.log("Token Data Extracting Done !!!");
    }

}