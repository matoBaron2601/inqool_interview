
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryClient } from "@tanstack/react-query";
import { AnimalCreate } from '@/types/animalTypes';

export const createAnimalMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (animal: AnimalCreate) => {

            const request = {
                method: 'POST',
                url: `https://inqool-interview-api.vercel.app/api/animals`,
                data: {
                    name: animal.name,
                    age: Number(animal.age),
                    type: animal.type,
                },
            };
            console.log(request.data)
            return axios.post(request.url, request.data);
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["animals"] });
            console.log('Animal has been created:', data.data);
        },
        onError: (error) => {
            console.error('Error creating animal:', error); 
        }
    });
};
