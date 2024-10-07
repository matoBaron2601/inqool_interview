import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { createAnimalMutation } from "../hooks/createAnimalMutation";
import { AnimalCreate } from "@/types/animalTypes";
import error from "@/images/error.png";


type AnimalFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UserForm({ isOpen, onClose }: AnimalFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AnimalCreate>();

  const { mutate: createAnimal, isPending, isError} = createAnimalMutation();

  const onSubmit: SubmitHandler<AnimalCreate> = async (
    animalCreate: AnimalCreate
  ) => {
    createAnimal(animalCreate, {
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
            <label htmlFor="type" className="text-lg">
              Type
            </label>
            <select
              id="type"
              defaultValue=""
              {...register("type", { required: "Type is required" })}
              className="border border-gray-300 p-2 rounded">
              <option value="" disabled>
                Select type
              </option>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
              <option value="other">Other</option>
            </select>
            {errors.type && (
              <span className="text-red-500">{errors.type.message}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="age" className="text-lg">
              Age
            </label>
            <input
              type="number"
              id="age"
              {...register("age", { required: "Age is required" })}
              className="border border-gray-300 p-2 rounded"
            />
            {errors.age && (
              <span className="text-red-500">{errors.age.message}</span>
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
              {isPending ? "Creating..." : "Submit"}
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
