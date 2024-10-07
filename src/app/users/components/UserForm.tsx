import { useForm, SubmitHandler } from "react-hook-form";
import { User, UserCreate } from "@/types/userTypes";
import { useEffect } from "react";
import { createUserMutation } from "../hooks/createUserMutation";
import Modal from "@/app/components/Modal";
import error from "@/images/error.png";


type UserFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UserForm({ isOpen, onClose }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserCreate>();

  const { mutate: createUser, isPending, isError } = createUserMutation();

  const onSubmit: SubmitHandler<UserCreate> = async (
    userCreate: UserCreate
  ) => {
    createUser(userCreate, {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
  };

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] h-auto p-6 border border-black rounded-lg flex flex-col justify-between">
        <button
          onClick={onClose}
          className="self-end text-gray-500 hover:text-gray-800 mb-4">
          &times;
        </button>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg">
              Name
            </label>
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              className="border border-gray-300 p-2 rounded"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="gender" className="text-lg">
              Gender
            </label>
            <select
              id="gender"
              defaultValue=""
              {...register("gender", { required: "Gender is required" })}
              className="border border-gray-300 p-2 rounded">
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-red-500">{errors.gender.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="banned" className="text-lg">
              Banned
            </label>
            <select
              id="banned"
              defaultValue=""
              {...register("banned", { required: "Banned status is required" })}
              className="border border-gray-300 p-2 rounded">
              <option value="" disabled>
                Select banned status
              </option>
              <option value={"true"}>Yes</option>
              <option value={"false"}>No</option>
            </select>
            {errors.banned && (
              <span className="text-red-500">{errors.banned.message}</span>
            )}
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-400 text-white py-2 px-6 text-lg rounded"
              onClick={() => {
                onClose();
                reset();
              }}>
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white py-2 px-6 text-lg rounded ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isPending}>
              {isPending ? "Creating user ..." : "Create user"}
            </button>
          </div>
          {isError && <div>
            <img src={error.src} alt="error" className="w-12 h-12 mb-2 mx-auto" />
            <p className="text-center mb-6 text-lg">Error occured during the creation</p>
          </div>}
        </form>
      </div>
    </div>
  );
}
