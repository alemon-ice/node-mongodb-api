import { Router } from "express";
import messageController from "../controllers/message.controller";
import authMiddleware from "../middlewares/auth";

const messageRoute = Router();

messageRoute.post(
  "/:id",
  authMiddleware.checkUserByToken,
  messageController.send
);

export default messageRoute;
