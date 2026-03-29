const { prisma } = require("../prisma/client");
const { asyncHandler } = require("../middleware/errorHandler");

const DEFAULT_USER_ID = parseInt(process.env.DEFAULT_USER_ID || "1", 10);

const listProducts = asyncHandler(async (req, res) => {
  const search = (req.query.search || "").trim();
  const categoryIdRaw = req.query.category;

  const where = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (categoryIdRaw !== undefined && categoryIdRaw !== "") {
    const categoryId = parseInt(categoryIdRaw, 10);
    if (Number.isNaN(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category id",
      });
    }
    where.categoryId = categoryId;
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      category: { select: { id: true, name: true } },
      images: { orderBy: { id: "asc" } },
    },
  });

  res.status(200).json({ success: true, data: products });
});

const getProductById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid product id" });
  }

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      images: { orderBy: [{ isPrimary: "desc" }, { id: "asc" }] },
    },
  });

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.status(200).json({ success: true, data: product });
});

const listCategories = asyncHandler(async (req, res) => {
  const categories = await prisma.category.findMany({
    orderBy: { id: "asc" },
  });
  res.status(200).json({ success: true, data: categories });
});

module.exports = {
  listProducts,
  getProductById,
  listCategories,
  DEFAULT_USER_ID,
};
