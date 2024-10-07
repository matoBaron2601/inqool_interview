import Image from 'next/image';
import dog from "../../../images/dog.png";
import cat from "../../../images/cat.png";
import other from "../../../images/user.png";
import { animalType } from '@/types/animalTypes';

export default function AnimalImage({ type }: { type: animalType }) {
  return (
    <>
      <Image
        src={
          type === "cat"
            ? cat
            : type === "dog"
            ? dog
            : other
        }
        alt={""}
        width={50}
        height={50}
      />
    </>
  );
}
