const { prisma } = require("../prisma/client");
const { asyncHandler } = require("../middleware/errorHandler");

const DEFAULT_USER_ID = parseInt(process.env.DEFAULT_USER_ID || "1", 10);

const listAddresses = asyncHandler(async (req, res) => {
  const userId = DEFAULT_USER_ID;
  const addresses = await prisma.address.findMany({
    where: { userId },
    orderBy: [{ isDefault: "desc" }, { id: "asc" }],
  });
  res.status(200).json({ success: true, data: addresses });
});

const createAddress = asyncHandler(async (req, res) => {
  const userId = DEFAULT_USER_ID;
  const { fullName, phone, street, city, state, pincode, isDefault } =
    req.body || {};

  if (!fullName || !phone || !street || !city || !state || !pincode) {
    return res.status(400).json({
      success: false,
      message:
        "fullName, phone, street, city, state, and pincode are required",
    });
  }

  const address = await prisma.$transaction(async (tx) => {
    if (isDefault) {
      await tx.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    return tx.address.create({
      data: {
        userId,
        fullName,
        phone,
        street,
        city,
        state,
        pincode,
        isDefault: Boolean(isDefault),
      },
    });
  });

  res.status(201).json({ success: true, data: address });
});

module.exports = { listAddresses, createAddress, DEFAULT_USER_ID };
