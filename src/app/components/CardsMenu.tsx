import { User } from "@/types/userTypes";
import { useState } from "react";
import Modal from "./Modal";
import { deleteUserMutation } from "../users/hooks/deleteUserMutation";
import { deleteAnimalMutation } from "../animals/hooks/deleteAnimalMutation";
import { useQueryClient } from "@tanstack/react-query";
import Form from "../users/components/UserForm";
import Card from "./Card";
import { Animal } from "@/types/animalTypes";
import { Creature } from "@/types/generalTypes";
import { isUser } from "@/utils/helpers";
import error from "@/images/error.png";
import deleteIcon from "@/images/deleteIcon.png";

export default function CardsMenu({
  creatures,
}: {
  creatures: User[] | Animal[];
}) {
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutate: deleteUser } = deleteUserMutation();
  const { mutate: deleteAnimal } = deleteAnimalMutation();
  const queryClient = useQueryClient();

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setIsErrorModalOpen(false);
    setSelectedCreature(null);
    setLoading(false);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    if (!selectedCreature) return;

    setLoading(true);

    if (isUser(selectedCreature)) {
      deleteUser(
        { userId: selectedCreature.id },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["users"] });
            console.log(`${selectedCreature.name} has been deleted.`);
            setLoading(false);
          },
          onError: () => {
            setLoading(false);
            setIsErrorModalOpen(true);
          },
        }
      );
    } else {
      deleteAnimal(
        { animalId: selectedCreature.id },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["animals"] });
            console.log(`${selectedCreature.name} has been deleted.`);
            setLoading(false);
          },
          onError: () => {
            setLoading(false);
            setIsErrorModalOpen(true);
          },
        }
      );
    }
  };

  const handleDelete = (creature: Creature) => {
    setSelectedCreature(creature);
    setIsDeleteModalOpen(true);
  };

  const handleShowError = (creature: Creature) => {
    setSelectedCreature(creature);
    setIsErrorModalOpen(true);
  };

  return (
    <div>
      {creatures && creatures.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-8">
          {creatures.map((creature: Creature) => (
            <div key={creature.id}>
              <Card
                creature={creature}
                onDelete={() => handleDelete(creature)}
                onError={() => handleShowError(creature)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>No creatures found.</div>
      )}

      {isDeleteModalOpen && selectedCreature && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseModal}
          onDelete={handleConfirmDelete}
          message={
            <p>
              Are you sure you want to delete{" "}
              <span className="font-bold">{selectedCreature.name}</span>?
            </p>
          }
          leftButtonText="Cancel"
          rightButtonText="Delete"
          icon={
            <img
              src={deleteIcon.src}
              alt="delete"
              className="w-12 h-12 mx-auto"
            />
          }
          loading={loading}
        />
      )}
      {isErrorModalOpen && selectedCreature && (
        <Modal
          isOpen={isErrorModalOpen}
          onClose={handleCloseModal}
          message="An error occurred. Your action has not been performed."
          leftButtonText="OK"
          icon={
            <img src={error.src} alt="error" className="w-12 h-12 mx-auto" />
          }
        />
      )}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <span className="text-white">Deleting ...</span>
        </div>
      )}
    </div>
  );
}
