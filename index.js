/*
 * Title: Index
 * Description: This is the index by which this application will be start
 * Author: Joy Sarkar
 * Date: 30-Nov-2023
 */

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./src/models/User");
const { hashPassword } = require("./src/utils/passwordUtils");

dotenv.config();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_URI);

    console.log("Database connected successfully");
  } catch (err) {
    console.error("MongoDB connection error", err);
  }
}

async function seedAdminUser() {
  const adminUserExists = await User.exists({ role: "admin" });

  if (!adminUserExists) {
    const adminUserData = {
      name: "admin",
      email: "admin@example.com",
      password: await hashPassword("12345678"),
      role: "admin",
    };

    const adminUser = await User.create(adminUserData);

    if (adminUser) {
      console.log("Admin user created");
    }
  }
}

async function startServer() {
  const PORT = process.env.PORT || 3000;
  const app = require("./app");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

(async () => {
  await connectToDatabase();
  await seedAdminUser();
  await startServer();
})();
