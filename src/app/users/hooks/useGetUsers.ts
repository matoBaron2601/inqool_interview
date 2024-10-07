import { User } from '@/types/userTypes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get('https://inqool-interview-api.vercel.app/api/users');
  
  const sortedUsers = response.data.sort((a: User, b: User) => 
    b.id.localeCompare(a.id)
  );

  return sortedUsers;
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'], 
    queryFn: fetchUsers,
  });
};
