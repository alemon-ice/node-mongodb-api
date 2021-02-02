import { UserInterface } from "../interfaces/user.interface";

class UserServices {
  public UserWithoutPassword(
    user: UserInterface
  ): Omit<UserInterface, "password"> {
    const withoutPassword = {
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
    };

    return withoutPassword;
  }
}

export default new UserServices();
