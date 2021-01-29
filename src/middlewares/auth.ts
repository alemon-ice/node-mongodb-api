import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserInterface } from "../interfaces/user.interface";
import userModel from "../models/user.model";

class AuthMiddleware {
  public async checkUserByToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(401).json({ message: "Acesso Restrito" });
    }

    try {
      const userToken = jwt.verify(
        String(token),
        "secrettoken"
      ) as UserInterface;

      const user = await userModel.findById(userToken._id);

      if (!user) {
        return res.status(400).json({ message: "Usuário não encontrado" });
      }

      req.user = user;

      return next();
    } catch (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
  }
}

export default new AuthMiddleware();
