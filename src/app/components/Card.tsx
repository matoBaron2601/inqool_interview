import { User } from "@/types/userTypes"; // Assuming User is defined here
import { Animal } from "@/types/animalTypes"; // Make sure you have an Animal type defined
import UserRows from "../users/components/UserRows";
import UserImage from "../users/components/UserImage";
import AnimalRows from "../animals/components/AnimalRows";
import AnimalImage from "../animals/components/AnimalImage";
import { isUser } from "@/utils/helpers";
import { on } from "events";

type CreatureCardProps = {
  creature: User | Animal;
  onDelete: (creature: User | Animal) => void;
  onError: (creature: User | Animal) => void;
};

export default function CreatureCard({
  creature,
  onDelete,
  onError,
}: CreatureCardProps) {
  return (
    <div className="h-[280px] w-[250px] p-6 border border-black bg-gray-200 flex flex-col justify-between rounded">
      <ul>
        {isUser(creature) ? (
          <UserRows user={creature} onError={onError} />
        ) : (
          <AnimalRows animal={creature} onError={onError} />
        )}
      </ul>
      <div className="flex justify-center">
        <button
          onClick={() => {
            onDelete(creature);
          }}
          className="mt-4 bg-red-500 text-white py-1 px-2 rounded">
          Delete {isUser(creature) ? "User" : "Animal"}
        </button>
      </div>
    </div>
  );
}
