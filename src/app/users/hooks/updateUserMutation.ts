import { UserUpdate } from '@/types/userTypes';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type UpdateUserMutationArgs = {
    userId: string;
    userData: UserUpdate;
};

export const updateUserMutation = () => {
    return useMutation({
        mutationFn: ({ userId, userData }: UpdateUserMutationArgs) => {
            return axios.patch(`https://inqool-interview-api.vercel.app/api/users/${userId}`, userData);
        },
    });
};
