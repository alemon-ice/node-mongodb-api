import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth";

const userRoute = Router();

userRoute.get(
  "/list-all",
  authMiddleware.checkUserByToken,
  userController.listAllUsers
);

userRoute.get("/", authMiddleware.checkUserByToken, userController.list);
userRoute.get("/:id", authMiddleware.checkUserByToken, userController.getById);
userRoute.post("/register", userController.register);
userRoute.post("/login", userController.authenticate);

export default userRoute;
