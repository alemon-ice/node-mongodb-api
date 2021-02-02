// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserInterface } from "../interfaces/user.interface";

declare global {
  namespace Express {
    interface Request {
      user: UserInterface;
    }
  }
}
