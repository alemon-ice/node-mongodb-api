import jwt from "jsonwebtoken";
import { UserInterface } from "../interfaces/user.interface";

class AuthServices {
  public generateToken(user: UserInterface): string {
    const decodedToken = {
      _id: String(user._id),
      name: user.name,
      avatar: user.avatar,
    };

    return jwt.sign(decodedToken, "secrettoken", {
      expiresIn: "1d",
    });
  }
}

export default AuthServices;
