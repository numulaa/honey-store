const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/stripes");

router.post("/payment", paymentController.postPayment);
module.exports = router;
