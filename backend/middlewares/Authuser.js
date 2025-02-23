import jwt from "jsonwebtoken";


//admin authentication middleware

const authuser = async(req , res , next) =>{
    try{
        const {token} = req.headers;
        if(!token){
            return res.json({success:false , message:"NOT AUTHORISED LOGIN AGAIN..."});
        }

        const tokendecode =  jwt.verify(token , process.env.JWT_SECRET_KEY);

        req.body.userid = tokendecode.id;

        next();

    }
    catch(error){
        res.json({success:false  , message:error.message})
    }
}


export default authuser;