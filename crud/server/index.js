import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import route from './routes/userRoute.js'
import cors from 'cors'
//1.create instance of expresss application
const app=express();

//Applying json parsing middleware
app.use(bodyParser.json());
//cors for allowing servers to permit cross-origin requests
app.use(cors());

//loading environment variables from .env file
dotenv.config();
//loading env variables port and mongourl
 const port=process.env.PORT || 7000;
 const mongourl=process.env.mongourl;

 // code for connecting with the mongodb database

 mongoose
    .connect(mongourl)
    .then(()=>{
        console.log("DB connected succesfully");
        app.listen(port,()=>{
            console.log(`server is running in port ${port}`);
        })
    })
    .catch((e)=>{
        console.log(e);
    })

    //mounting middleware
    app.use("/api",route)