import { BaseCreature } from "./generalTypes";

type GenderType = 'female' | 'male' | 'other';

export type User = BaseCreature & {
    gender:GenderType;
    banned:boolean;
}

export type UserUpdate = Partial<Omit<User, 'id'>>;

export type UserCreate = {
    name: string;
    gender: GenderType;
    banned: string | boolean;
  };