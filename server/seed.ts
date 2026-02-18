// npx tsx seed.ts

import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./src/models/Admin.js";
import Shipment from "./src/models/Shipment.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error("MONGODB_URI environment variable is not set");
    }

    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    // Clear existing data (optional - comment out if you want to preserve data)
    // await Admin.deleteMany({});
    // await Shipment.deleteMany({});
    // console.log('Cleared existing data');

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Admin@123", salt);

    const adminExists = await Admin.findOne({
      email: "admin@acmelogistics.com",
    });
    if (!adminExists) {
      const admin = new Admin({
        name: "John Anderson",
        email: "admin@acmelogistics.com",
        password: hashedPassword,
        role: "super_admin",
        department: "Operations",
        phone: "+1-555-0100",
        status: "active",
      });
      await admin.save();
      console.log("✓ Admin user created");
    }

    // Create sample shipments
    const shipmentData = [
      {
        id: "SHIP-001",
        trackingNumber: "TRK001",
        customer: "Acme Corp",
        origin: "New York, NY",
        destination: "Los Angeles, CA",
        status: "in_transit",
        carrier: "FedEx",
        weight: "250 lbs",
        value: 5000,
      },
      {
        id: "SHIP-002",
        trackingNumber: "TRK002",
        customer: "Global Industries",
        origin: "Chicago, IL",
        destination: "Houston, TX",
        status: "delivered",
        carrier: "UPS",
        weight: "150 lbs",
        value: 3500,
      },
      {
        id: "SHIP-003",
        trackingNumber: "TRK003",
        customer: "Tech Solutions Inc",
        origin: "Seattle, WA",
        destination: "Boston, MA",
        status: "pending",
        carrier: "DHL",
        weight: "75 lbs",
        value: 2000,
      },
    ];

    for (const data of shipmentData) {
      const exists = await Shipment.findOne({
        trackingNumber: data.trackingNumber,
      });
      if (!exists) {
        const shipment = new Shipment(data);
        await shipment.save();
      }
    }
    console.log("✓ Sample shipments created/checked");

    console.log("\n✓ Database seeding completed successfully");
    console.log("\nYou can now login with:");
    console.log("Email: admin@acmelogistics.com");
    console.log("Password: Admin@123");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
