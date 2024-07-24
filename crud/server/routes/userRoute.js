//for defining the endpoint of the application and map them to the specific controller method

//1.import express
import express from "express"
import { create } from "../controller/userController.js"
import { getAllUsers } from "../controller/userController.js";
import { getUserById } from "../controller/userController.js";
import { update } from "../controller/userController.js";
import { deleteUser } from "../controller/userController.js";
// create express router instance

const route=express.Router();//express.Router() is used to define routes for specific endpoints 
// route-handler method for handling incoming request to specific path and providing responses
route.post("/user",create)

route.get("/users",getAllUsers)

route.get("/user/:id",getUserById);
route.put("/update/user/:id", update);
route.delete("/delete/user/:id",deleteUser);
export default route;

