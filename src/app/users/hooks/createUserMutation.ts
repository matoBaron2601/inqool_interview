import { UserCreate } from '@/types/userTypes';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryClient } from "@tanstack/react-query";

export const createUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user: UserCreate) => {
            const request = {
                method: 'POST',
                url: `https://inqool-interview-api.vercel.app/api/users`,
                data: {
                    name: user.name,
                    banned: user.banned === 'true',
                    gender: user.gender,
                },
            };
            console.log(request.data)
            return axios.post(request.url, request.data);
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["users"] });
            console.log('User has been created:', data.data);
        },
        onError: (error) => {
            console.error('Error creating user:', error); 
        }
    });
};
