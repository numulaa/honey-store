const Product = require("../models/Product");
module.exports = {
  getIndex: async (req, res) => {
    try {
      //query by time updated
      const qNew = req.query.new;
      //query by category
      const qCategory = req.query.category;
      let products;
      if (qNew) {
        products = await Product.find().sort({ _id: -1 }).limit(5);
      } else if (qCategory) {
        products = await Product.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        products = await Product.find();
      }

      // res.status(200).json(products);
      // res.status(200).render("shop-items.ejs", { products: products });
      // res.render("partials/shop-items", { products: products });
      res.render("index.ejs", { products: products });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
