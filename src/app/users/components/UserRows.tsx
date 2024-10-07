import Row from "@/app/components/Row";
import { User } from "@/types/userTypes";

import nameTag from "../../../images/name-tag.png";
import genderTag from "../../../images/gender.png";
import bannedTag from "../../../images/police-cap.png";
import { useState } from "react";
import { updateUserMutation } from "../hooks/updateUserMutation";
import { useQueryClient } from "@tanstack/react-query";
import UserImage from "./UserImage";

export default function UserRows({
  user,
  onError,
}: {
  user: User;
  onError: (user: User) => void;
}) {
  const [isBanned, setIsBanned] = useState(user.banned);
  const [gender, setGender] = useState(user.gender);
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(user.name);


  const { mutate: updateUser } = updateUserMutation();
  const queryClient = useQueryClient();

  const handleToggle = () => {
    const newBannedStatus = !isBanned;
    setIsBanned(newBannedStatus);

    updateUser(
      {
        userId: user.id,
        userData: { banned: newBannedStatus },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          console.log(
            `${user.name} has been ${newBannedStatus ? "banned" : "unbanned"}.`
          );
        },
        onError: () => {
          onError(user);
          setIsBanned((prev) => !prev);
        },
      }
    );
  };

  const handleGenderToggle = () => {
    const genderOptions: Array<"male" | "female" | "other"> = [
      "male",
      "female",
      "other",
    ];
    const currentIndex = genderOptions.indexOf(gender);
    const nextIndex = (currentIndex + 1) % genderOptions.length;
    const newGender = genderOptions[nextIndex];
    setGender(newGender);

    updateUser(
      {
        userId: user.id,
        userData: { gender: newGender },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          console.log(`${user.name} is now ${newGender}.`);
        },
        onError: () => {
          onError(user);
          setGender(() => genderOptions[currentIndex]);
        },
      }
    );
  };

  const handleNameUpdate = () => {
    setIsEditingName(false);

    updateUser(
      {
        userId: user.id,
        userData: { name },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          console.log(`${user.name} has been updated to ${name}.`);
        },
        onError: () => {
          onError(user);
          setName(user.name);
        },
      }
    );
  };

  return (
    <>
      <div className="flex justify-center mb-8">
        <UserImage gender={gender} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          {isEditingName ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md px-2 py-1 w-[100%]"
              />
              <button
                onClick={handleNameUpdate}
                className="text-blue-500 font-semibold ml-2"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <Row text={name} icon={nameTag} />
              <button
                onClick={() => setIsEditingName(true)}
                className="text-blue-500 font-semibold mr-1.5"
              >
                Edit
              </button>
            </>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Row text={gender} icon={genderTag} />
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              onClick={handleGenderToggle}
            />
            <div
              className={`w-10 h-6 rounded-full shadow-inner transition-colors duration-300 ${
                gender === "male"
                  ? "bg-blue-500"
                  : gender === "female"
                  ? "bg-pink-500"
                  : "bg-yellow-500"
              }`}></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transition-transform duration-300 ${
                gender === "male"
                  ? "translate-x-0"
                  : gender === "female"
                  ? "translate-x-1/2"
                  : "translate-x-full"
              }`}></div>
          </label>
        </div>

        <div className="flex justify-between items-center">
          <Row text={isBanned ? "banned" : "unbanned"} icon={bannedTag} />
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isBanned}
              onChange={handleToggle}
              className="sr-only"
            />
            <div
              className={`w-10 h-6 rounded-full shadow-inner transition-colors duration-300 ${
                isBanned ? "bg-red-500" : "bg-green-500"
              }`}></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transition-transform duration-300 ${
                isBanned ? "transform translate-x-full" : ""
              }`}></div>
          </label>
        </div>
      </div>
    </>
  );
}
