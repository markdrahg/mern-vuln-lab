import { Router } from "express";
import { signup, login, currentAdmin } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/admin/signup", signup);
router.post("/admin/login", login);
router.get("/me", authMiddleware, currentAdmin);

export default router;
