//for managing the structure of data and interacting with the datasbase

//1. importing mongoose library for mongodb interaction
import mongoose from "mongoose";

//2. Defining schema for userData
 
const userSchema =new mongoose.Schema({
    //defining the fields
    name:{
        type:String,required:true

    },
    email:{
        type:String,required:true

    },
    address:{
        type:String,required:true

    }
})
//creating model to interact with the mongodb collection and exporting
export default mongoose.model("Users",userSchema)