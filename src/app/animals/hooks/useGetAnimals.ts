import { Animal } from '@/types/animalTypes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const fetchAnimals= async () : Promise<Animal[]> => {
    const response = await axios.get('https://inqool-interview-api.vercel.app/api/animals');
  

  const sortedAnimals = response.data.sort((a: Animal, b: Animal) => 
    b.id.localeCompare(a.id)
  );

  return sortedAnimals
}
  export const useGetAnimals = () => {
    return useQuery({
      queryKey: ['animals'], 
      queryFn: fetchAnimals,
    });
  };