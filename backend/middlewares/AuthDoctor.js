import jwt from "jsonwebtoken";


//doctor authentication middleware

const authDoctor = async(req , res , next) =>{
    
    try{
        const {dtoken} = req.headers;
        if(!dtoken){
            return res.json({success:false , message:"NOT AUTHORISED LOGIN AGAIN..."});
        }

        const tokendecode =  jwt.verify(dtoken , process.env.JWT_SECRET_KEY);

        req.body.doctorid = tokendecode.id;

        next();

    }
    catch(error){
        res.json({success:false  , message:error.message})
    }
}


export default authDoctor;