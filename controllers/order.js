const Order = require("../models/Order");

module.exports = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getUserOrders: async (req, res) => {
    try {
      //users can have more tahn one order
      const orders = await Order.find({ userId: req.params.userID });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  postOrder: async (req, res) => {
    const newOrder = new Order(req.body);
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  editOrder: async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteOrder: async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getMonthlyIncome: async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );
    try {
      const income = await Order.aggregate([
        {
          $match: { createdAt: { $gte: previousMonth } },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            //take the amount of porduct that are sold, based on the order schema
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
