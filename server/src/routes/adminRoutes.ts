import { Router } from "express";
import { authMiddleware, adminOnlyMiddleware } from "../middleware/auth.js";
import {
  getDashboardMetrics,
  getAllAdmins,
  getAdminById,
  getAllShipments,
  getShipmentById,
  createShipment,
  updateShipment,
  deleteShipment,
  getReportMetrics,
} from "../controllers/adminController.js";

const router = Router();

// Protect all routes with auth and admin middleware
router.use(authMiddleware, adminOnlyMiddleware);

// ==================== DASHBOARD ====================
router.get("/dashboard/metrics", getDashboardMetrics);

// ==================== ADMINS / USERS ====================
router.get("/users", getAllAdmins);
router.get("/users/:id", getAdminById);

// ==================== SHIPMENTS ====================
router.get("/shipments", getAllShipments);
router.get("/shipments/:id", getShipmentById);
router.post("/shipments", createShipment);
router.put("/shipments/:id", updateShipment);
router.delete("/shipments/:id", deleteShipment);

// ==================== REPORTS ====================
router.get("/reports/metrics", getReportMetrics);

export default router;
