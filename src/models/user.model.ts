import { model, Schema, Document, ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import { UserInterface } from "../interfaces/user.interface";

interface UserModel extends UserInterface, Document {
  _id: string | ObjectId;
  comparePasswords(password: string): Promise<boolean>;
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

UserSchema.pre<UserModel>("save", async function encryptPassword() {
  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.pre<UserModel>("save", async function generateAvatar() {
  if (!this.avatar) {
    const randomId = Math.floor(Math.random() * 1000000) + 1;

    this.avatar = `https://api.adorable.io/avatars/285/${randomId}.png`;
  }
});

export default model<UserModel>("users", UserSchema);
