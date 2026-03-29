const express = require("express");
const {
  listAddresses,
  createAddress,
} = require("../controllers/addressController");

const router = express.Router();

router.get("/address", listAddresses);
router.post("/address", createAddress);

module.exports = router;
