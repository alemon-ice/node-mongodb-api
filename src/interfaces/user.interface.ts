import { ObjectId } from "mongoose";

export interface UserInterface {
  _id: string | ObjectId;
  name: string;
  password: string;
  avatar?: string;
}
