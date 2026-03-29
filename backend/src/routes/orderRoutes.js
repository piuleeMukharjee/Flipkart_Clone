const express = require("express");
const {
  placeOrder,
  listOrders,
  getOrderById,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/orders", placeOrder);
router.get("/orders", listOrders);
router.get("/orders/:id", getOrderById);

module.exports = router;
