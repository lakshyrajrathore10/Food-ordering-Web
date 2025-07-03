import mongoose, { connect } from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect("mongodb+srv://lakshyraj10:7089Maa@cluster0.388txqp.mongodb.net/foodDel").then(()=>{
        console.log("Db connect");
    })
}