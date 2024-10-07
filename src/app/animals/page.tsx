"use client";

import { useState } from "react";
import Input from "../components/Input";
import Filter from "../components/RadioFilter";
import CardsMenu from "../components/CardsMenu";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { useGetAnimals } from "./hooks/useGetAnimals";
import AnimalsForm from "./components/AnimalsForm";
import errorImage from "@/images/error.png";

export default function Animals() {
  const { data, isLoading, error } = useGetAnimals();
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [minAgeFilter, setMinAgeFilter] = useState("");
  const [maxAgeFilter, setMaxAgeFilter] = useState("");
  const [formOpen, setFormOpen] = useState(false);


  if (isLoading) return <Loading message="Loading animals ..." />;
  if (error) {
    return (
      <Modal
        isOpen={!!error}
        onClose={() => {
          window.location.reload();
        }}
        leftButtonText="Reload"
        message={error.message}
        icon={
          <img src={errorImage.src} alt="Error" className="w-12 h-12 mx-auto" />
        }
      />
    );
  }

  const filteredAnimals = data?.filter((animal) => {
    const nameMatches = animal.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase());
    const typeMatches = typeFilter === "all" || animal.type === typeFilter;

    const minAge = minAgeFilter === "" ? 0 : parseInt(minAgeFilter);
    const maxAge = maxAgeFilter === "" ? Infinity : parseInt(maxAgeFilter);
    const ageMatches = animal.age >= minAge && animal.age <= maxAge;

    return nameMatches && typeMatches && ageMatches;
  });

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
          onClick={() => setFormOpen(true)}>
          Add Animal +
        </button>
      </div>
      <div className="flex justify-center gap-x-28 gap-y-4 mb-8 mt-6 flex-wrap">
        <Input
          filter={nameFilter}
          setFilter={setNameFilter}
          name="Name"
          placeholder="Search by name"
        />

        <Filter
          title="Type"
          selectedValue={typeFilter}
          options={[
            { label: "All", value: "all" },
            { label: "Cat", value: "cat" },
            { label: "Dog", value: "dog" },
            { label: "Other", value: "other" },
          ]}
          onChange={setTypeFilter}
        />

        <div className="flex space-x-4">
          <Input
            filter={minAgeFilter}
            setFilter={setMinAgeFilter}
            name="Minimal age"
            placeholder="0"
            type="number"
          />
          <Input
            filter={maxAgeFilter}
            setFilter={setMaxAgeFilter}
            name="Maximal age"
            placeholder="Infinity"
            type="number"

          />
        </div>
      </div>

      {filteredAnimals && filteredAnimals.length > 0 ? (
        <CardsMenu creatures={filteredAnimals} />
      ) : (
        <div className="flex justify-center items-center mt-[20%]">
          <p className="text-3xl text-gray-500">No animals found!</p>
        </div>
      )}

      <AnimalsForm isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  );
}
