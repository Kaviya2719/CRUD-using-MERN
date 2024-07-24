//for handling the requests ,processing the data and generating the responses
// controller contains logic

//1.importing user model
import User from "../model/userModel.js";

// for inserting data into the database
    //1.create async function taking request and reonse as parameters 
    export const create= async(req,res)=>{
        //try catch for error handling
        try {
            //create new user object or new instace for mangoose model based on data received from an htt request
            const newUser = new User(req.body);
            const {email}=newUser;//this will extract the email from the model
            const userExist=await User.findOne({email})
                if(userExist){
                    return res.status(400).json({message:"User already exists"})
                }
                const saveData=await newUser.save();
                res.status(200).json({message:"User created Successfully"});
        } catch (error) {
            /* here we handle any error that occurs during the process by responding the client with status code
            and the error message */
           res.status(500).json({errorMessage:error.message})
        }

    }
    export const getAllUsers =async(req,res)=>{
        try {
            //find()-to retrieve all the data from the database
            const userData = await User.find();
            if(!userData || userData.length === 0){
                res.status(404).json({message:"User data not found"})
            }
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json({errorMessage:error.message})
        }
    }

    // find  user by Id
    export const getUserById=async(req,res)=>{
        try {
            //extracting user from the parameter and in parameter we will be passing the Id
            const id =req.params.id;//extract id from the param in the url 
            const userExist = await User.findById(id);
            if(!userExist){
                res.status(404).json({message:"User not found"});
            }
            res.status(200).json(userExist);
        } catch (error) {
            res.status(500).json({errorMessage:error.message});
        }
    }

    export const update = async (req,res)=>{
        try {
            const id=req.params.id;
            const userExist=await User.findById(id);
            if(!userExist){
                res.status(404).json({message:"User not found"});
            }
            const updatedData = await User.findByIdAndUpdate(id,req.body,{//here it takes three parameters id,req.body,new:true
                new:true
            })
            res.status(200).json({message:"User Updated Successfully"});
            //id parameter---extracts id from the request
            //req.body---is what we are updating
            //new:true---returns the new updated document insted of original one 
        } catch (error) {
            res.status(500).json({errorMessage:error.message})
        }
    }

    export const deleteUser = async (req,res)=>{
        try {
            const id =req.params.id;
            const userExist=await User.findById(id);
            if(!userExist){
                res.status(404).json({message:"User not found"});
            }
            const deleted =await User.findByIdAndDelete(id);
            res.status(200).json({message:"Deleted succesfully"})
        } catch (error) {
            res.status(500).json({errorMessage:error.message})
        }
    }