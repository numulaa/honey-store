const User = require("../models/User");
module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const query = req.query.new;
      //limit to 1 only will show the last one updated, if limit 5, will display 5 last updated products
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(1)
        : await User.find();

      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      //to not send password in the response for more security
      //using _doc so that we only receive the data we want, not all of the res
      const { password, ...others } = user._doc;
      //only send others than the password as the response
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  editUser: async (req, res) => {
    if (req.body.password) {
      //hashed the password
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SEC_PASS
      ).toString();
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("used has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getUserStats: async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
      const data = await User.aggregate([
        {
          $match: { createdAt: { $gte: lastYear } },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
