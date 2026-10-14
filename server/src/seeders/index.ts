import dotenv from "dotenv";
import mongoose from "mongoose";
import userSeeder from "./user.seeder";

dotenv.config();

const runSeeders = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    console.log("🍃 MongoDB connected");

    await userSeeder();

    console.log("✅ All seeders completed");

    await mongoose.connection.close();

    console.log("🔌 MongoDB connection closed");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder failed:", error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

runSeeders();