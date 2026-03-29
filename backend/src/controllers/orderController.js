const { prisma } = require("../prisma/client");
const { asyncHandler } = require("../middleware/errorHandler");

const DEFAULT_USER_ID = parseInt(process.env.DEFAULT_USER_ID || "1", 10);

const placeOrder = asyncHandler(async (req, res) => {
  const { addressId } = req.body || {};
  const aid = parseInt(addressId, 10);

  if (Number.isNaN(aid)) {
    return res.status(400).json({
      success: false,
      message: "addressId is required",
    });
  }

  const userId = DEFAULT_USER_ID;

  const address = await prisma.address.findFirst({
    where: { id: aid, userId },
  });

  if (!address) {
    return res.status(404).json({
      success: false,
      message: "Address not found for user",
    });
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: { include: { product: true } },
    },
  });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Cart is empty",
    });
  }

  for (const line of cart.items) {
    if (line.product.stock < line.quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for ${line.product.name}`,
      });
    }
  }

  let totalAmount = 0;
  for (const line of cart.items) {
    totalAmount += line.product.price * line.quantity;
  }

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        userId,
        addressId: aid,
        totalAmount,
        status: "PENDING",
        items: {
          create: cart.items.map((line) => ({
            productId: line.productId,
            quantity: line.quantity,
            priceAtPurchase: line.product.price,
          })),
        },
      },
      include: {
        items: { include: { product: true } },
        address: true,
      },
    });

    for (const line of cart.items) {
      await tx.product.update({
        where: { id: line.productId },
        data: { stock: { decrement: line.quantity } },
      });
    }

    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    return created;
  });

  res.status(201).json({ success: true, data: order });
});

const listOrders = asyncHandler(async (req, res) => {
  const userId = DEFAULT_USER_ID;
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: { where: { isPrimary: true }, take: 1 },
            },
          },
        },
      },
      address: true,
    },
  });
  res.status(200).json({ success: true, data: orders });
});

const getOrderById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid order id" });
  }

  const userId = DEFAULT_USER_ID;
  const order = await prisma.order.findFirst({
    where: { id, userId },
    include: {
      items: {
        include: {
          product: {
            include: { images: true },
          },
        },
      },
      address: true,
    },
  });

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  res.status(200).json({ success: true, data: order });
});

module.exports = { placeOrder, listOrders, getOrderById, DEFAULT_USER_ID };
