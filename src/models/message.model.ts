import { model, Schema } from "mongoose";

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

export default model("messages", MessageSchema);
