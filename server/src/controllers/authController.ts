import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import ActivityLog from "../models/ActivityLog.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, department, role = "admin" } = req.body;

    // Validation
    if (!name || !email || !password || !department) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      department,
      role,
      status: "active",
    });

    await admin.save();

    // Log activity
    await ActivityLog.create({
      actionType: "user_management",
      adminId: admin._id,
      adminName: name,
      description: `New admin account created: ${email}`,
      status: "success",
    });

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        department: admin.department,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error during signup" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if admin is active
    if (admin.status !== "active") {
      return res.status(403).json({ message: "Admin account is inactive" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "24h" },
    );

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Log activity
    await ActivityLog.create({
      actionType: "login",
      adminId: admin._id,
      adminName: admin.name,
      description: `Admin login successful: ${email}`,
      status: "success",
    });

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        department: admin.department,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error during login" });
  }
};

export const currentAdmin = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        department: admin.department,
        role: admin.role,
        status: admin.status,
      },
    });
  } catch (error) {
    console.error("Current admin error:", error);
    res.status(500).json({ message: "Error fetching admin info" });
  }
};
