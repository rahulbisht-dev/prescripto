import mongoose from "mongoose";

const url = process.env.URL;


const connectdb = async() =>{
    const connect = mongoose.connect(url);
    console.log("database connected successfully ...")
}


export default connectdb;