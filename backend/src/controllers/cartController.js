const { prisma } = require("../prisma/client");
const { asyncHandler } = require("../middleware/errorHandler");

const DEFAULT_USER_ID = parseInt(process.env.DEFAULT_USER_ID || "1", 10);

async function getOrCreateCart(userId) {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: {
                where: { isPrimary: true },
                take: 1,
              },
            },
          },
        },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
  }

  return cart;
}

const getCart = asyncHandler(async (req, res) => {
  const userId = DEFAULT_USER_ID;
  const cart = await getOrCreateCart(userId);
  res.status(200).json({ success: true, data: cart });
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body || {};
  const pid = parseInt(productId, 10);
  const qty = parseInt(quantity, 10);

  if (Number.isNaN(pid) || Number.isNaN(qty) || qty < 1) {
    return res.status(400).json({
      success: false,
      message: "productId and positive quantity are required",
    });
  }

  const product = await prisma.product.findUnique({ where: { id: pid } });
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }
  if (product.stock < qty) {
    return res.status(400).json({
      success: false,
      message: "Insufficient stock",
    });
  }

  const userId = DEFAULT_USER_ID;
  const cart = await getOrCreateCart(userId);

  const existing = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: { cartId: cart.id, productId: pid },
    },
  });

  let item;
  if (existing) {
    const newQty = existing.quantity + qty;
    if (product.stock < newQty) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock for total quantity",
      });
    }
    item = await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: newQty },
      include: {
        product: {
          include: {
            images: { where: { isPrimary: true }, take: 1 },
          },
        },
      },
    });
  } else {
    item = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: pid,
        quantity: qty,
      },
      include: {
        product: {
          include: {
            images: { where: { isPrimary: true }, take: 1 },
          },
        },
      },
    });
  }

  const updated = await getOrCreateCart(userId);
  res.status(201).json({ success: true, data: updated, item });
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { cartItemId, quantity } = req.body || {};
  const itemId = parseInt(cartItemId, 10);
  const qty = parseInt(quantity, 10);

  if (Number.isNaN(itemId) || Number.isNaN(qty) || qty < 1) {
    return res.status(400).json({
      success: false,
      message: "cartItemId and positive quantity are required",
    });
  }

  const userId = DEFAULT_USER_ID;
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found" });
  }

  const line = await prisma.cartItem.findFirst({
    where: { id: itemId, cartId: cart.id },
    include: { product: true },
  });

  if (!line) {
    return res.status(404).json({ success: false, message: "Cart item not found" });
  }

  if (line.product.stock < qty) {
    return res.status(400).json({
      success: false,
      message: "Insufficient stock",
    });
  }

  await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity: qty },
  });

  const updated = await getOrCreateCart(userId);
  res.status(200).json({ success: true, data: updated });
});

const removeCartItem = asyncHandler(async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  if (Number.isNaN(itemId)) {
    return res.status(400).json({ success: false, message: "Invalid item id" });
  }

  const userId = DEFAULT_USER_ID;
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found" });
  }

  const line = await prisma.cartItem.findFirst({
    where: { id: itemId, cartId: cart.id },
  });

  if (!line) {
    return res.status(404).json({ success: false, message: "Cart item not found" });
  }

  await prisma.cartItem.delete({ where: { id: itemId } });
  const updated = await getOrCreateCart(userId);
  res.status(200).json({ success: true, data: updated });
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  DEFAULT_USER_ID,
};
