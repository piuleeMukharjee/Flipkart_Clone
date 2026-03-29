-- Reference SQL aligned with prisma/schema.prisma.
-- Prefer `npm run db:seed` (prisma/seed.js) for maintenance — this file is optional
-- for DBAs who want raw SQL after `prisma db push` / migrations.

-- Wipe (respect FK order)
TRUNCATE TABLE
  "OrderItem",
  "Order",
  "CartItem",
  "Cart",
  "Address",
  "ProductImage",
  "Product",
  "Category",
  "User"
RESTART IDENTITY CASCADE;

-- Categories
INSERT INTO "Category" ("id", "name", "imageUrl", "createdAt") VALUES
  (1, 'Electronics', 'https://picsum.photos/seed/electronics/320/200', NOW()),
  (2, 'Fashion', 'https://picsum.photos/seed/fashion/320/200', NOW()),
  (3, 'Home', 'https://picsum.photos/seed/homecat/320/200', NOW()),
  (4, 'Books', 'https://picsum.photos/seed/books/320/200', NOW()),
  (5, 'Sports', 'https://picsum.photos/seed/sports/320/200', NOW());

SELECT setval(pg_get_serial_sequence('"Category"', 'id'), (SELECT MAX("id") FROM "Category"));

-- User (demo id = 1)
INSERT INTO "User" ("id", "name", "email", "phone", "createdAt") VALUES
  (1, 'Demo User', 'demo@flipkartclone.local', '9876543210', NOW());

SELECT setval(pg_get_serial_sequence('"User"', 'id'), (SELECT MAX("id") FROM "User"));

-- Default address + empty cart
INSERT INTO "Address" ("userId", "fullName", "phone", "street", "city", "state", "pincode", "isDefault") VALUES
  (1, 'Demo User', '9876543210', '221B Baker Street', 'Mumbai', 'Maharashtra', '400001', true);

INSERT INTO "Cart" ("userId") VALUES (1);

-- Run `npm run db:seed` to load 24 products + images (this SQL omits bulk product rows on purpose).
