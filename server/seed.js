import sequelize from "./config/sequelize.config.js";
import {
  Product,
  ProductColor,
  ProductDetail,
  ProductSize,
} from "./modules/Products/product.model.js";
import { User, Otp } from "./modules/Users/user.model.js";
import { discount } from "./modules/discount/discount.model.js";

async function seed() {
  try {
    console.log("🔄 Syncing database...");
    await sequelize.sync({ force: true });
    console.log("✔ Database synced!");

    // --------------------------
    // USERS
    // --------------------------
    const users = await User.bulkCreate([
      { fullname: "Parsa", mobile: "09120000001" },
      { fullname: "Ali", mobile: "09120000002" },
      { fullname: "Sara", mobile: "09120000003" },
    ]);

    await Otp.bulkCreate([
      { user_id: users[0].id, code: "1111", expires_in: new Date(Date.now() + 60000) },
      { user_id: users[1].id, code: "2222", expires_in: new Date(Date.now() + 60000) },
      { user_id: users[2].id, code: "3333", expires_in: new Date(Date.now() + 60000) },
    ]);

    // --------------------------
    // PRODUCTS (8 ITEMS)
    // --------------------------
    const products = await Product.bulkCreate([
      // SINGLE
      { title: "USB Cable", price: 120000, type: "single", description: "High quality USB cable" },
      { title: "Wireless Charger", price: 350000, type: "single", description: "Fast charging" },

      // COLORING
      { title: "T-Shirt", price: 200000, type: "coloring", description: "Premium cotton shirt" },
      { title: "Sneakers", price: 900000, type: "coloring", description: "Comfortable running shoes" },

      // SIZING
      { title: "Pants", price: 450000, type: "sizing", description: "Slim fit pants" },
      { title: "Ring", price: 150000, type: "sizing", description: "Stainless steel ring" },

      // EXTRA SINGLE
      { title: "Bluetooth Speaker", price: 700000, type: "single", description: "Loud and clear" },
      { title: "Power Bank", price: 600000, type: "single", description: "10000mAh" },
    ]);

    // --------------------------
    // DETAILS FOR SINGLE PRODUCTS
    // --------------------------
    const singleProducts = products.filter((p) => p.type === "single");

    for (const p of singleProducts) {
      await ProductDetail.bulkCreate([
        { product_id: p.id, key: "material", value: "plastic" },
        { product_id: p.id, key: "warranty", value: "6 months" },
      ]);
    }

    // --------------------------
    // COLORS FOR COLORING PRODUCTS
    // --------------------------
    const coloringProducts = products.filter((p) => p.type === "coloring");

    for (const p of coloringProducts) {
      await ProductColor.bulkCreate([
        { product_id: p.id, color_name: "Red", color_hex: "#FF0000", price: p.price + 20000 },
        { product_id: p.id, color_name: "Blue", color_hex: "#0000FF", price: p.price + 20000 },
        { product_id: p.id, color_name: "Black", color_hex: "#000000", price: p.price + 20000 },
      ]);
    }

    // --------------------------
    // SIZES FOR SIZING PRODUCTS
    // --------------------------
    const sizingProducts = products.filter((p) => p.type === "sizing");

    for (const p of sizingProducts) {
      await ProductSize.bulkCreate([
        { product_id: p.id, size: "S", price: p.price + 10000 },
        { product_id: p.id, size: "M", price: p.price + 15000 },
        { product_id: p.id, size: "L", price: p.price + 20000 },
      ]);
    }

    // --------------------------
    // DISCOUNTS
    // --------------------------
    await discount.bulkCreate([
      {
        code: "OFF10",
        amount: null,
        precent: 10,
        type: "Cart",
        limit: 100,
        usage: 0,
        expires_in: new Date(Date.now() + 86400000),
      },
      {
        code: "SHOES50",
        amount: 50000,
        precent: null,
        type: "product",
        produt_id: products[3].id, // sneakers
        limit: 50,
        usage: 0,
        expires_in: new Date(Date.now() + 86400000 * 2),
      },
    ]);

    console.log("✔ Seed completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeder Error:", err);
    process.exit(1);
  }
}

seed();
