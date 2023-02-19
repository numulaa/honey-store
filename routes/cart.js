const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

router.post("/", verifyToken, cartController.postCart);
//user should be authorized
router.put("/:id", verifyTokenAndAuthorization, cartController.editCart);
router.delete("/:id", verifyTokenAndAuthorization, cartController.deleteCart);
// //users and admin can see product
router.get("/find/:userId", cartController.getUserCart);
router.get("/", verifyTokenAndAdmin, cartController.getAllCarts);

module.exports = router;
