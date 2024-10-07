import { Creature } from "@/types/generalTypes";
import { User } from "@/types/userTypes";

export function isUser(creature: Creature): creature is User {
    return (creature as User).gender !== undefined;
  }