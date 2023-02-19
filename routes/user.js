const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

router.put("/:id", verifyTokenAndAuthorization, userController.editUser);
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);
router.get("/find/:id", verifyTokenAndAdmin, userController.getUser);
router.get("/", verifyTokenAndAdmin, userController.getAllUsers);
router.get("/stats", verifyTokenAndAdmin, userController.getUserStats);

module.exports = router;
