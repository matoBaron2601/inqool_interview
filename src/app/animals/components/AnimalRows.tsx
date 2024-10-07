import Row from "@/app/components/Row";
import nameTag from "../../../images/name-tag.png";
import animalTypeIcon from "../../../images/pet.png";
import ageIcon from "../../../images/age.png";
import { Animal } from "@/types/animalTypes";
import AnimalImage from "./AnimalImage";
import { useState } from "react";
import { updateAnimalMutation } from "../hooks/updateAnimalMutation";
import { useQueryClient } from "@tanstack/react-query";

export default function AnimalRows({
  animal,
  onError,
}: {
  animal: Animal;
  onError: (animal: Animal) => void;
}) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAge, setIsEditingAge] = useState(false);
  const [name, setName] = useState(animal.name);
  const [age, setAge] = useState(animal.age.toString());
  const [animalType, setAnimalType] = useState(animal.type);

  const { mutate: updateAnimal } = updateAnimalMutation();
  const queryClient = useQueryClient();

  const handleNameUpdate = () => {
    setIsEditingName(false);
    updateAnimal(
      {
        animalId: animal.id,
        animalData: { name },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["animals"] });
          console.log(`${animal.name} has been updated to ${name}.`);
        },
        onError: () => {
          onError(animal);
          setName(animal.name);
        },
      }
    );
  };

  const handleAgeUpdate = () => {
    setIsEditingAge(false);
    updateAnimal(
      {
        animalId: animal.id,
        animalData: { age: parseInt(age) },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["animals"] });
          console.log(`${animal.name}'s age has been updated to ${age}.`);
        },
        onError: () => {
          onError(animal);
          setAge(animal.age.toString());
        },
      }
    );
  };

  const handleTypeToggle = () => {
    const animalOptions: Array<"cat" | "dog" | "other"> = [
      "cat",
      "dog",
      "other",
    ];
    const currentIndex = animalOptions.indexOf(animalType);
    const nextIndex = (currentIndex + 1) % animalOptions.length;
    const newAnimalType = animalOptions[nextIndex];

    setAnimalType(newAnimalType);

    updateAnimal(
      {
        animalId: animal.id,
        animalData: { type: newAnimalType },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["animals"] });
          console.log(`${animal.name} is now a ${newAnimalType}.`);
        },
        onError: () => {
          onError(animal);
          setAnimalType(animal.type);
        },
      }
    );
  };

  return (
    <>
      <div className="flex justify-center mb-8">
        <AnimalImage type={animalType} />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          {isEditingName ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md px-2 py-1 w-[100%]"
              />
              <button
                onClick={handleNameUpdate}
                className="text-blue-500 font-semibold ml-2">
                Save
              </button>
            </>
          ) : (
            <>
              <Row text={name} icon={nameTag} />
              <button
                onClick={() => setIsEditingName(true)}
                className="text-blue-500 font-semibold mr-1.5">
                Edit
              </button>
            </>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Row text={animalType} icon={animalTypeIcon} />
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              onClick={handleTypeToggle}
            />
            <div
              className={`w-10 h-6 rounded-full shadow-inner transition-colors duration-300 ${
                animalType === "cat"
                  ? "bg-blue-500"
                  : animalType === "dog"
                  ? "bg-orange-500"
                  : "bg-purple-500"
              }`}></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transition-transform duration-300 ${
                animalType === "cat"
                  ? "translate-x-0"
                  : animalType === "dog"
                  ? "translate-x-1/2"
                  : "translate-x-full"
              }`}></div>
          </label>
        </div>

        <div className="flex justify-between items-center">
          {isEditingAge ? (
            <>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="border rounded-md px-2 py-1 w-[100%]"
              />
              <button
                onClick={handleAgeUpdate}
                className="text-blue-500 font-semibold ml-2">
                Save
              </button>
            </>
          ) : (
            <>
              <Row text={age} icon={ageIcon} />
              <button
                onClick={() => setIsEditingAge(true)}
                className="text-blue-500 font-semibold mr-1.5">
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
