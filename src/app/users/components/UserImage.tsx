import Image from 'next/image';
import woman from "../../../images/woman.png";
import man from "../../../images/man.png";
import other from "../../../images/user.png";

export default function UserImage({ gender }: { gender: string }) {
  return (
    <>
      <Image
        src={
          gender === "male"
            ? man
            : gender === "female"
            ? woman
            : other
        }
        alt={""}
        width={50}
        height={50}
      />
    </>
  );
}
