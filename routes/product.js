const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

router.post("/", verifyTokenAndAdmin, productController.postProduct);
router.put("/:id", verifyTokenAndAdmin, productController.editProduct);
router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct);
//users and admin can see product
router.get("/find/:id", productController.getProduct);
router.get("/", productController.getAllProducts);

module.exports = router;
