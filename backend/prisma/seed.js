/* eslint-disable no-console */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const categories = [
  {
    name: "Electronics",
    imageUrl: "https://picsum.photos/seed/electronics/320/200",
  },
  {
    name: "Fashion",
    imageUrl: "https://picsum.photos/seed/fashion/320/200",
  },
  {
    name: "Home",
    imageUrl: "https://picsum.photos/seed/homecat/320/200",
  },
  {
    name: "Books",
    imageUrl: "https://picsum.photos/seed/books/320/200",
  },
  {
    name: "Sports",
    imageUrl: "https://picsum.photos/seed/sports/320/200",
  },
];

function img(seed, w = 600, h = 600) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

const products = [
  {
    name: "Wireless Bluetooth Headphones Pro",
    description:
      "40mm drivers, 30-hour battery, ANC, foldable design. Includes carrying case and USB-C cable.",
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    stock: 120,
    rating: 4.4,
    reviewCount: 8934,
    catIndex: 0,
    images: ["wbh1", "wbh2", "wbh3"],
  },
  {
    name: 'Smart LED TV 43" 4K Ultra HD',
    description:
      "HDR10, Dolby Audio, 3 HDMI ports, smart apps built-in. Voice remote included.",
    price: 26999,
    originalPrice: 35999,
    discount: 25,
    stock: 45,
    rating: 4.2,
    reviewCount: 2103,
    catIndex: 0,
    images: ["tv43a", "tv43b"],
  },
  {
    name: "Gaming Laptop 16GB RAM RTX",
    description:
      "15.6\" FHD 144Hz, Intel i7, 512GB NVMe SSD, backlit keyboard. Ideal for gaming and creators.",
    price: 89999,
    originalPrice: 109999,
    discount: 18,
    stock: 28,
    rating: 4.6,
    reviewCount: 567,
    catIndex: 0,
    images: ["laptop1", "laptop2", "laptop3"],
  },
  {
    name: "Smartphone 128GB 5G",
    description:
      "6.7\" AMOLED, 50MP triple camera, 5000mAh fast charge. Latest Android with 3 years updates.",
    price: 22999,
    originalPrice: 27999,
    discount: 18,
    stock: 200,
    rating: 4.3,
    reviewCount: 12450,
    catIndex: 0,
    images: ["phone1", "phone2"],
  },
  {
    name: "Noise Smartwatch with AMOLED",
    description:
      "SpO2, heart rate, 100+ sports modes, GPS, water resistant. 7-day typical battery.",
    price: 3499,
    originalPrice: 6999,
    discount: 50,
    stock: 340,
    rating: 4.1,
    reviewCount: 4521,
    catIndex: 0,
    images: ["watch1", "watch2"],
  },
  {
    name: "Men's Slim Fit Casual Shirt",
    description:
      "100% cotton, breathable, easy iron. Regular fit suitable for office and casual wear.",
    price: 799,
    originalPrice: 1599,
    discount: 50,
    stock: 500,
    rating: 4.0,
    reviewCount: 3200,
    catIndex: 1,
    images: ["shirt1", "shirt2"],
  },
  {
    name: "Women's Printed Kurti Set",
    description:
      "Rayon fabric, machine washable, includes dupatta. Available in festive prints.",
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    stock: 180,
    rating: 4.2,
    reviewCount: 890,
    catIndex: 1,
    images: ["kurti1", "kurti2"],
  },
  {
    name: "Running Shoes Lightweight",
    description:
      "Mesh upper, cushioned sole, ergonomic fit. Suitable for daily runs and gym.",
    price: 1999,
    originalPrice: 3999,
    discount: 50,
    stock: 400,
    rating: 4.3,
    reviewCount: 6789,
    catIndex: 1,
    images: ["shoe1", "shoe2", "shoe3"],
  },
  {
    name: "Leather Wallet for Men",
    description:
      "Genuine leather, RFID blocking, 6 card slots and coin pocket. Gift box included.",
    price: 599,
    originalPrice: 1299,
    discount: 54,
    stock: 250,
    rating: 4.5,
    reviewCount: 1120,
    catIndex: 1,
    images: ["wallet1"],
  },
  {
    name: "Designer Sunglasses UV400",
    description:
      "Polarized lenses, lightweight metal frame. Includes microfiber pouch.",
    price: 899,
    originalPrice: 1999,
    discount: 55,
    stock: 300,
    rating: 4.0,
    reviewCount: 445,
    catIndex: 1,
    images: ["sun1", "sun2"],
  },
  {
    name: "Stainless Steel Cookware Set 10pc",
    description:
      "Induction compatible, dishwasher safe, stay-cool handles. 2-year warranty.",
    price: 4499,
    originalPrice: 7999,
    discount: 44,
    stock: 95,
    rating: 4.4,
    reviewCount: 2301,
    catIndex: 2,
    images: ["cook1", "cook2"],
  },
  {
    name: "Memory Foam Bed Pillow Pair",
    description:
      "Orthopedic support, hypoallergenic cover, queen size. Relieves neck strain.",
    price: 1299,
    originalPrice: 2199,
    discount: 41,
    stock: 600,
    rating: 4.2,
    reviewCount: 5100,
    catIndex: 2,
    images: ["pillow1"],
  },
  {
    name: "Vacuum Cleaner Cordless Stick",
    description:
      "HEPA filter, 45 min runtime, detachable handheld. Wall mount dock.",
    price: 12999,
    originalPrice: 18999,
    discount: 32,
    stock: 60,
    rating: 4.3,
    reviewCount: 777,
    catIndex: 2,
    images: ["vac1", "vac2"],
  },
  {
    name: "Decorative Wall Clock 12 inch",
    description:
      "Silent quartz movement, modern minimal design. Battery operated.",
    price: 699,
    originalPrice: 1399,
    discount: 50,
    stock: 220,
    rating: 4.1,
    reviewCount: 890,
    catIndex: 2,
    images: ["clock1"],
  },
  {
    name: "Ceramic Dinner Set 24 Pieces",
    description:
      "Microwave safe, elegant white glaze. Serves 6 people.",
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    stock: 140,
    rating: 4.5,
    reviewCount: 1320,
    catIndex: 2,
    images: ["dinner1", "dinner2"],
  },
  {
    name: "The Complete Guide to Web Development",
    description:
      "Paperback, 520 pages. Covers HTML, CSS, JavaScript, and modern frameworks.",
    price: 599,
    originalPrice: 999,
    discount: 40,
    stock: 80,
    rating: 4.6,
    reviewCount: 210,
    catIndex: 3,
    images: ["bookweb1"],
  },
  {
    name: "Science Fiction Box Set – 3 Novels",
    description:
      "Bestselling trilogy in paperback slipcase. Collector edition.",
    price: 899,
    originalPrice: 1499,
    discount: 40,
    stock: 150,
    rating: 4.7,
    reviewCount: 3400,
    catIndex: 3,
    images: ["booksf1", "booksf2"],
  },
  {
    name: "Children's Illustrated Encyclopedia",
    description:
      "Full color, 300+ pages. STEM topics explained for ages 8–14.",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    stock: 200,
    rating: 4.4,
    reviewCount: 560,
    catIndex: 3,
    images: ["bookkid1"],
  },
  {
    name: "Mindfulness and Productivity Journal",
    description:
      "Hardcover, undated daily prompts. Premium paper, ribbon marker.",
    price: 449,
    originalPrice: 799,
    discount: 44,
    stock: 400,
    rating: 4.3,
    reviewCount: 890,
    catIndex: 3,
    images: ["journal1"],
  },
  {
    name: "Cricket Bat English Willow",
    description:
      "Full size, pre-knocked, protective cover. Suitable for leather ball.",
    price: 3499,
    originalPrice: 5999,
    discount: 42,
    stock: 70,
    rating: 4.5,
    reviewCount: 412,
    catIndex: 4,
    images: ["bat1", "bat2"],
  },
  {
    name: "Yoga Mat 6mm Anti-Slip",
    description:
      "TPE material, eco-friendly, carry strap included. 183cm x 61cm.",
    price: 799,
    originalPrice: 1499,
    discount: 47,
    stock: 350,
    rating: 4.2,
    reviewCount: 2890,
    catIndex: 4,
    images: ["yoga1"],
  },
  {
    name: "Adjustable Dumbbells Pair 20kg",
    description:
      "Quick lock mechanism, compact for home gym. Grip comfort coating.",
    price: 5999,
    originalPrice: 8999,
    discount: 33,
    stock: 55,
    rating: 4.4,
    reviewCount: 230,
    catIndex: 4,
    images: ["dumb1"],
  },
  {
    name: "Football Size 5 FIFA Quality",
    description:
      "Thermally bonded panels, all-weather. Pump and needle included.",
    price: 1299,
    originalPrice: 2199,
    discount: 41,
    stock: 180,
    rating: 4.3,
    reviewCount: 1500,
    catIndex: 4,
    images: ["ball1", "ball2"],
  },
  {
    name: "Cycling Helmet with LED Light",
    description:
      "EPS foam, adjustable dial fit, removable visor. CE certified.",
    price: 1899,
    originalPrice: 2999,
    discount: 37,
    stock: 120,
    rating: 4.1,
    reviewCount: 670,
    catIndex: 4,
    images: ["helmet1"],
  },
  {
    name: "USB-C Hub 7-in-1 Aluminum",
    description:
      "HDMI 4K, SD/microSD, 3 USB 3.0, PD pass-through 100W. Mac and Windows compatible.",
    price: 1899,
    originalPrice: 3499,
    discount: 46,
    stock: 200,
    rating: 4.3,
    reviewCount: 1820,
    catIndex: 0,
    images: ["hubusb1", "hubusb2"],
  },
  {
    name: "Wireless Ergonomic Mouse",
    description:
      "2.4GHz + Bluetooth dual mode, silent clicks, 12-month battery, adjustable DPI.",
    price: 899,
    originalPrice: 1799,
    discount: 50,
    stock: 410,
    rating: 4.2,
    reviewCount: 5600,
    catIndex: 0,
    images: ["mousew1"],
  },
  {
    name: "Portable SSD 1TB USB 3.2",
    description:
      "Read speeds up to 1050MB/s, shock resistant, password protection software included.",
    price: 7999,
    originalPrice: 11999,
    discount: 33,
    stock: 85,
    rating: 4.5,
    reviewCount: 920,
    catIndex: 0,
    images: ["ssd1", "ssd2"],
  },
  {
    name: "Bluetooth Party Speaker 40W",
    description:
      "RGB lights, IPX5 splash proof, 12h playtime, TWS pairing for stereo.",
    price: 4999,
    originalPrice: 7999,
    discount: 38,
    stock: 110,
    rating: 4.0,
    reviewCount: 2100,
    catIndex: 0,
    images: ["spk40a", "spk40b"],
  },
  {
    name: "Men's Slim Fit Denim Jeans",
    description:
      "Stretch denim, mid-rise, dark wash. Machine wash cold, tumble dry low.",
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    stock: 320,
    rating: 4.1,
    reviewCount: 4500,
    catIndex: 1,
    images: ["jeans1", "jeans2"],
  },
  {
    name: "Unisex Laptop Backpack 30L",
    description:
      "Padded laptop sleeve, USB charging port, water-resistant fabric, luggage strap.",
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    stock: 275,
    rating: 4.4,
    reviewCount: 3100,
    catIndex: 1,
    images: ["backp1"],
  },
  {
    name: "Fleece Hoodie Zip-Up",
    description:
      "Soft fleece lining, kangaroo pockets, drawstring hood. Available in multiple colors.",
    price: 1799,
    originalPrice: 3499,
    discount: 49,
    stock: 190,
    rating: 4.2,
    reviewCount: 780,
    catIndex: 1,
    images: ["hoodie1", "hoodie2"],
  },
  {
    name: "Insulated Water Bottle 1L Twin Pack",
    description:
      "Stainless steel, keeps cold 24h / hot 12h, leak-proof flip lid. BPA free.",
    price: 999,
    originalPrice: 1999,
    discount: 50,
    stock: 500,
    rating: 4.3,
    reviewCount: 12000,
    catIndex: 2,
    images: ["bottle1"],
  },
  {
    name: "Smart LED Bulbs Pack of 4",
    description:
      "9W equivalent 60W, warm white, app dimming when used with compatible hub.",
    price: 799,
    originalPrice: 1599,
    discount: 50,
    stock: 600,
    rating: 4.0,
    reviewCount: 8900,
    catIndex: 2,
    images: ["bulb1", "bulb2"],
  },
  {
    name: "Indian Cooking — Masterclass Cookbook",
    description:
      "Hardcover, 280 recipes, regional cuisines, step-by-step photos.",
    price: 699,
    originalPrice: 1299,
    discount: 46,
    stock: 130,
    rating: 4.8,
    reviewCount: 450,
    catIndex: 3,
    images: ["cookbk1"],
  },
  {
    name: "Mystery Thriller — Bestseller Paperback",
    description:
      "Twist-filled plot, 400 pages. From award-winning author.",
    price: 399,
    originalPrice: 699,
    discount: 43,
    stock: 300,
    rating: 4.5,
    reviewCount: 8900,
    catIndex: 3,
    images: ["mystery1", "mystery2"],
  },
  {
    name: "Badminton Racket Set Pair",
    description:
      "Graphite composite, pre-strung, includes cover and 3 feather shuttles.",
    price: 1599,
    originalPrice: 2799,
    discount: 43,
    stock: 95,
    rating: 4.2,
    reviewCount: 2100,
    catIndex: 4,
    images: ["badm1", "badm2"],
  },
  {
    name: "Speed Jump Rope with Counter",
    description:
      "Steel cable, ball bearings, ergonomic handles, built-in LCD rep counter.",
    price: 599,
    originalPrice: 1199,
    discount: 50,
    stock: 400,
    rating: 4.0,
    reviewCount: 3400,
    catIndex: 4,
    images: ["jrope1"],
  },
];

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const createdCategories = [];
  for (const c of categories) {
    createdCategories.push(await prisma.category.create({ data: c }));
  }

  for (const p of products) {
    const categoryId = createdCategories[p.catIndex].id;
    const { images: imageSeeds, catIndex, ...productData } = p;
    await prisma.product.create({
      data: {
        ...productData,
        categoryId,
        images: {
          create: imageSeeds.map((seed, i) => ({
            imageUrl: img(seed),
            isPrimary: i === 0,
          })),
        },
      },
    });
  }

  const user = await prisma.user.create({
    data: {
      name: "Demo User",
      email: "demo@flipkartclone.local",
      phone: "9876543210",
    },
  });

  if (user.id !== 1) {
    console.warn(
      "Expected default user id=1; reset sequences or use empty DB for demos."
    );
  }

  await prisma.address.create({
    data: {
      userId: user.id,
      fullName: "Demo User",
      phone: "9876543210",
      street: "221B Baker Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isDefault: true,
    },
  });

  await prisma.cart.create({
    data: {
      userId: user.id,
    },
  });

  console.log(
    `Seeded ${createdCategories.length} categories, ${products.length} products, user id=${user.id}`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
