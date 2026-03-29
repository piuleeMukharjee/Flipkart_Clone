const express = require("express");
const {
  listProducts,
  getProductById,
  listCategories,
} = require("../controllers/productController");

const router = express.Router();

router.get("/products", listProducts);
router.get("/products/:id", getProductById);
router.get("/categories", listCategories);

module.exports = router;
