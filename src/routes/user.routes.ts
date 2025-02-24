import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userController.createUser);

userRouter.get("/:userId", userController.getUserProfile);

export default userRouter;
