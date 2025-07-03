import foodModel from "../models/foodModel.js";
import fs from 'fs'
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required!" });
    }

    const image_filename = req.file.filename;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      image: image_filename
    });

    await food.save();
    res.status(201).json({ success: true, message: "Food added" });
    
  } catch (error) {
    console.error(" Error while saving food:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

const listFood=async(req,res)=>{
  try {
    const foods =await foodModel.find({});
    res.json({success:true,data:foods})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

//remove food item
const removeFood= async(req,res)=>{
try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"food removed"})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error "})
}
}
export { addFood , listFood,removeFood};
