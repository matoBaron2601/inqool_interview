import { BaseCreature } from "./generalTypes";

export type animalType = 'cat' | 'dog' | 'other';

export type Animal = BaseCreature & {
    type:animalType;
    age:number;
}

export type AnimalUpdate = Partial<Omit<Animal, 'id'>>;

export type AnimalCreate = Omit<Animal, 'id'>;