import { Router } from "express";
import userController from "../controllers/user.controller";

const userRoute = Router();

userRoute.post("/register", userController.register);
userRoute.post("/login", userController.authenticate);

export default userRoute;
