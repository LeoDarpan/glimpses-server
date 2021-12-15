import jwt from 'jsonwebtoken';

//User wants to like
//He clicks the like button
//this middleware is triggered to check and authorize the user to make the action if logged in
//If this check goes correct, only then the like controller is fired
const auth = async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(" ")[1];//Get token from the object converted array
        console.log(token);
        const isCustomAuth = token.length < 500; //Its custom token otherwise GoogleAuth token

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, process.env.SECRET);

            request.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token);

            request.userId = decodedData?.sub; //Sub is Google's name for a specific Id
        }
        next();
    } catch (error) {
        console.log(error);
        next();
    }
}
export default auth;