const express = require("express");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/cart", getCart);
router.post("/cart/add", addToCart);
router.put("/cart/update", updateCartItem);
router.delete("/cart/remove/:itemId", removeCartItem);

module.exports = router;
