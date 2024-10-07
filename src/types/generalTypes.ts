import { Animal } from "./animalTypes";
import { User } from "./userTypes";

export type BaseCreature = {
    id:string;
    name:string;
}


export type Creature = User | Animal;