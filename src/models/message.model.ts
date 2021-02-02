import { Document, DocumentQuery, Model, model, Schema } from "mongoose";
import { MessageInterface } from "../interfaces/message.interface";

interface MessageModel extends MessageInterface, Document {}

interface MessageStatic extends Model<MessageModel> {
  findChat(
    idUserLogged: string,
    idUserChat: string
  ): DocumentQuery<MessageModel[], MessageModel>;
}

const MessageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

MessageSchema.statics.findChat = function (
  idUserLogged: string,
  idUserChat: string
): DocumentQuery<MessageModel[], MessageModel> {
  return this.find({
    $or: [
      { $and: [{ sender: idUserLogged }, { receiver: idUserChat }] },
      { $and: [{ sender: idUserChat }, { receiver: idUserLogged }] },
    ],
  });
};

export default model<MessageModel, MessageStatic>("messages", MessageSchema);
