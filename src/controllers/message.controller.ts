import { Request, Response } from "express";
import messageModel from "../models/message.model";

class MessageController {
  public async send(req: Request, res: Response): Promise<Response> {
    const message = await messageModel.create({
      text: req.body.text,
      // sender: req.body.sender,
      sender: "",
      receiver: req.params.id,
    });

    return res.json(message);
  }
}

export default new MessageController();
