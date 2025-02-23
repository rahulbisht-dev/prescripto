import express from "express"
import cors from "cors"
import "dotenv/config"
import connectdb from "./config/mongodb.js";
import connectcloudinary from "./config/cloudinary.js";
import adminRouter from "./router/Adminroute.js";
import doctorRouter from "./router/Doctorroute.js";
import userRouter from "./router/Userroute.js";

//app config

const app = express();
const port = process.env.PORT || 9999;
connectdb()
connectcloudinary();

//middlewares 

app.use(express.json());
app.use(cors());


// api endpoints

app.use("/api/admin" , adminRouter);
app.use("/api/doctors" , doctorRouter);
app.use("/api/user" , userRouter);


app.get("/" , (req , res) =>{
    res.send("api working")
})




app.listen(port , ()=>console.log("server started successfully on the port " , port))