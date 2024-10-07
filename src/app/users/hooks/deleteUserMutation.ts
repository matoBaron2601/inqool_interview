import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type DeleteUserMutationArgs = {
    userId: string;
};

export const deleteUserMutation = () => {
    return useMutation({
        mutationFn: ({ userId }: DeleteUserMutationArgs) => {
            return axios.delete(`https://inqool-interview-api.vercel.app/api/users/${userId}`);
        },

    })
}
