import { AnimalUpdate } from '@/types/animalTypes';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type UpdateAnimalMutationArgs = {
    animalId: string;
    animalData: AnimalUpdate;
};

export const updateAnimalMutation = () => {
    return useMutation({
        mutationFn: ({ animalId, animalData }: UpdateAnimalMutationArgs) => {
            return axios.patch(`https://inqool-interview-api.vercel.app/api/animals/${animalId}`, animalData);
        },
    });
};
