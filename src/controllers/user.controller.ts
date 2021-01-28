import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user.model";
import AuthServices from "../services/auth.services";

class UserController {
  public async register(req: Request, res: Response): Promise<Response> {
    const user = await userModel.create(req.body);
    const response = {
      message: "Usuário cadastrado com sucesso",
      user: {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
      },
    };

    return res.json(response);
  }

  public async authenticate(req: Request, res: Response): Promise<Response> {
    const { name, password } = req.body;

    const authServices = new AuthServices();

    const user = await userModel.findOne({ name });

    if (!user) {
      return res.status(400).json({ message: "Usuário não cadastrado." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Senha inválida." });
    }

    return res.json({
      user: user,
      token: authServices.generateToken(user),
    });
  }
}

export default new UserController();
