import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user.model";
import authServices from "../services/auth.services";
import userServices from "../services/user.services";

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

  public async getById(req: Request, res: Response): Promise<Response> {
    const userId = req.params.id;

    const user = await userModel.findById(userId);

    const withoutPassword = userServices.UserWithoutPassword(user);

    return res.json(withoutPassword);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const userId = req.user._id;

    const users = await userModel.find({ _id: { $ne: userId } });

    const usersWithoutPassword = users.map((user) =>
      userServices.UserWithoutPassword(user)
    );

    return res.json(usersWithoutPassword);
  }

  public async listAllUsers(req: Request, res: Response): Promise<Response> {
    const users = await userModel.find();

    const usersWithoutPassword = users.map((user) =>
      userServices.UserWithoutPassword(user)
    );

    return res.json(usersWithoutPassword);
  }
}

export default new UserController();
