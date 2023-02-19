const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

router.post("/", verifyToken, orderController.postOrder);
//only admin can update order
router.put("/:id", verifyTokenAndAdmin, orderController.editOrder);
router.delete("/:id", verifyTokenAndAdmin, orderController.deleteOrder);
// // //users and admin can see product
router.get(
  "/find/:userId",
  verifyTokenAndAuthorization,
  orderController.getUserOrders
);
router.get("/", verifyTokenAndAdmin, orderController.getAllOrders);
//get monthly income
router.get("/income", verifyTokenAndAdmin, orderController.getMonthlyIncome);

module.exports = router;
