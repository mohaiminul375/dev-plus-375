import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

// create a user :POST
router.post('/', userController.createUser)

export const userRouter = router;