import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.itemId) {
      return res.status(400).json({ success: false, message: "Missing userId or itemId" });
    }

    const userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const cartData = userData.cartData || {};

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.itemId) {
      return res.status(400).json({ success: false, message: "Missing userId or itemId" });
    }

    const userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const cartData = userData.cartData || {};

    if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from cart" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Get user cart data
const getCart = async (req, res) => {
  try {
    if (!req.body.userId) {
      return res.status(400).json({ success: false, message: "Missing userId" });
    }

    const userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const cartData = userData.cartData || {};

    res.json({ success: true, cartData });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

export { addToCart, getCart, removeFromCart };
