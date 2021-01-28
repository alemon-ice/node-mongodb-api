import { model, Schema, Document, ObjectId } from "mongoose";
import { UserInterface } from "../interfaces/user.interface";

interface UserModel extends UserInterface, Document {
  _id: string | ObjectId
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
});

export default model<UserModel>("users", UserSchema);
