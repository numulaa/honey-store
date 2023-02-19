const Cart = require("../models/Cart");

module.exports = {
  getAllCarts: async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getUserCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userID });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  postCart: async (req, res) => {
    const newCart = new Cart(req.body);
    try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  editCart: async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteCart: async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
