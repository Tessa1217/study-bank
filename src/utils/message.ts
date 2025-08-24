import { MESSAGE_CONSTANT } from "@/constants/message";
export function getMessage(path: string): string | null {
  const keys = path.split(".");

  const message = (function () {
    let messageObject: any = MESSAGE_CONSTANT;
    for (const key of keys) {
      if (messageObject && key in messageObject) {
        messageObject = messageObject[key];
      } else {
        return null;
      }
    }
    return messageObject;
  })();

  return typeof message === "string" ? message : null;
}
