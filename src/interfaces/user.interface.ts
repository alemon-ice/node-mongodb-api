import { ObjectId } from "mongoose";

export interface UserInterface {
  _id: string | ObjectId;
  name: string;
  password?: string;
  avatar?: string;
}

export interface MessageUserInterface extends UserInterface {
  lastMessage: string;
  lastMessageDate: string;
}
