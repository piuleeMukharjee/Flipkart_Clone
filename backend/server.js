require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { errorHandler } = require("./src/middleware/errorHandler");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const addressRoutes = require("./src/routes/addressRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ SIMPLE CORS (recommended)
app.use(cors());

app.use(express.json());

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "OK" });
});

// ✅ Routes
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api", addressRoutes);

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ✅ Error handler
app.use(errorHandler);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});