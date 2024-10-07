import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type DeleteAnimalMutationArgs = {
    animalId: string;
};

export const deleteAnimalMutation = () => {
    return useMutation({
        mutationFn: ({ animalId }: DeleteAnimalMutationArgs) => {
            return axios.delete(`https://inqool-interview-api.vercel.app/api/animals/${animalId}`);
        },

    })
}
