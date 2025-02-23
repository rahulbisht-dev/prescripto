import jwt from "jsonwebtoken";


//admin authentication middleware

const authAdmin = async(req , res , next) =>{
    try{
        const {atoken} = req.headers;
        if(!atoken){
            return res.json({success:false , message:"NOT AUTHORISED LOGIN AGAIN..."});
        }

        const tokendecode =jwt.verify(atoken , process.env.JWT_SECRET_KEY);

        if(tokendecode !== process.env.ADMIN_EMAIL + process.env.PASSWORD){
            return res.json({success:false , message:"Not Authorised fck Login Again"})
        }
        next();

    }
    catch(error){
        res.json({success:false  , message:error.message})
    }
}


export default authAdmin;