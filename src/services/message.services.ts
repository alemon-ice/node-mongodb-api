import { MessageInterface } from "../interfaces/message.interface";
import {
  UserInterface,
  MessageUserInterface,
} from "../interfaces/user.interface";

class MessageService {
  public getResultUserMessage(
    messages: MessageInterface[],
    user: UserInterface
  ): MessageUserInterface {
    return {
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      lastMessage: messages[0]?.text || null,
      lastMessageDate: messages[0]?.createdAt || null,
    };
  }

  public returnOrderedMessages(
    usersMessage: MessageUserInterface[]
  ): MessageUserInterface[] {
    return usersMessage.sort((a: any, b: any) => {
      return (
        (a.lastMessageDate ? 0 : 1) - (b.lastMessageDate ? 0 : 1) ||
        -(a.lastMessageDate > b.lastMessageDate) ||
        +(a.lastMessageDate < b.lastMessageDate)
      );
    });
  }
}

export default new MessageService();
