import { Request, Response } from "express";
import messageModel from "../models/message.model";
import userModel from "../models/user.model";

class MessageController {
  public async send(req: Request, res: Response): Promise<Response> {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    const message = await messageModel.create({
      text: req.body.text,
      sender: req.user._id,
      receiver: req.params.id,
    });

    return res.json(message);
  }
}

export default new MessageController();
