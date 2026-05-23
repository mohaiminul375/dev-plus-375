import { Router } from "express";
import { authController } from "./auth.controller";
const router = Router();
// user login func router
router.post('/login',authController.LogInUser)
export const authRouter = router