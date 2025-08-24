import { MESSAGE_CONSTANT } from "@/constants/message";
export function getMessage(path: string) {
  const keys = path.split(".");

  const message = (function () {
    let messageObject = MESSAGE_CONSTANT;
    for (const key of keys) {
      if (messageObject && key in messageObject) {
        messageObject = messageObject[key];
      } else {
        return null;
      }
    }
    return messageObject;
  })();

  return message;
}
