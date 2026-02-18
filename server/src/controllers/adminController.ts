import { Request, Response } from "express";
import Admin from "../models/Admin.js";
import Shipment from "../models/Shipment.js";

// ==================== DASHBOARD METRICS ====================
export const getDashboardMetrics = async (req: Request, res: Response) => {
  try {
    const totalAdmins = await Admin.countDocuments({ status: "active" });
    const totalShipments = await Shipment.countDocuments();
    const deliveredShipments = await Shipment.countDocuments({
      status: "delivered",
    });
    const inTransitShipments = await Shipment.countDocuments({
      status: "in_transit",
    });

    res.json({
      totalAdmins,
      totalShipments,
      deliveredShipments,
      inTransitShipments,
      deliveryRate:
        totalShipments > 0
          ? ((deliveredShipments / totalShipments) * 100).toFixed(2)
          : "0",
    });
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    res.status(500).json({ message: "Error fetching dashboard metrics" });
  }
};

// ==================== ADMINS / USERS ====================
export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;

    const skip = (page - 1) * limit;

    // Build filter query
    const filter: any = {};
    if (status) {
      filter.status = status;
    }

    const admins = await Admin.find(filter)
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Admin.countDocuments(filter);

    res.json({
      data: admins,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ message: "Error fetching admins" });
  }
};

export const getAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ admin });
  } catch (error) {
    console.error("Error fetching admin:", error);
    res.status(500).json({ message: "Error fetching admin" });
  }
};

// ==================== SHIPMENTS ====================
export const getAllShipments = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;

    const skip = (page - 1) * limit;

    // Build filter query
    const filter: any = {};
    if (status) {
      filter.status = status;
    }

    // Date range filtering
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate);
      }
    }

    const shipments = await Shipment.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Shipment.countDocuments(filter);

    res.json({
      data: shipments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching shipments:", error);
    res.status(500).json({ message: "Error fetching shipments" });
  }
};

export const getShipmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const shipment = await Shipment.findById(id);
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.json({ shipment });
  } catch (error) {
    console.error("Error fetching shipment:", error);
    res.status(500).json({ message: "Error fetching shipment" });
  }
};

export const createShipment = async (req: Request, res: Response) => {
  try {
    const {
      id,
      trackingNumber,
      customer,
      origin,
      destination,
      carrier,
      weight,
      value,
    } = req.body;

    // Validation
    if (
      !id ||
      !trackingNumber ||
      !customer ||
      !origin ||
      !destination ||
      !carrier ||
      !weight ||
      !value
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if tracking number already exists
    const existing = await Shipment.findOne({ trackingNumber });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Tracking number already exists" });
    }

    const shipment = new Shipment({
      id,
      trackingNumber,
      customer,
      origin,
      destination,
      carrier,
      weight,
      value,
      status: "pending",
      createdBy: req.user?.id,
    });

    await shipment.save();

    res.status(201).json({
      message: "Shipment created successfully",
      shipment,
    });
  } catch (error) {
    console.error("Error creating shipment:", error);
    res.status(500).json({ message: "Error creating shipment" });
  }
};

export const updateShipment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const shipment = await Shipment.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.json({
      message: "Shipment updated successfully",
      shipment,
    });
  } catch (error) {
    console.error("Error updating shipment:", error);
    res.status(500).json({ message: "Error updating shipment" });
  }
};

export const deleteShipment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const shipment = await Shipment.findByIdAndDelete(id);
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.json({
      message: "Shipment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting shipment:", error);
    res.status(500).json({ message: "Error deleting shipment" });
  }
};

// ==================== REPORTS ====================
export const getReportMetrics = async (req: Request, res: Response) => {
  try {
    // Total shipments by status
    const shipmentsByStatus = await Shipment.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Total value by status
    const totalValueByStatus = await Shipment.aggregate([
      {
        $group: {
          _id: "$status",
          totalValue: { $sum: "$value" },
        },
      },
    ]);

    // Shipments by carrier
    const shipmentByCarrier = await Shipment.aggregate([
      {
        $group: {
          _id: "$carrier",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      shipmentsByStatus,
      totalValueByStatus,
      shipmentByCarrier,
    });
  } catch (error) {
    console.error("Error fetching report metrics:", error);
    res.status(500).json({ message: "Error fetching report metrics" });
  }
};
