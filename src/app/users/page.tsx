"use client";

import { use, useState } from "react";
import { useGetUsers } from "./hooks/useGetUsers";
import Input from "../components/Input";
import Filter from "../components/RadioFilter";
import CardsMenu from "../components/CardsMenu";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import errorImage from "@/images/error.png";
import Form from "./components/UserForm";

export default function Users() {
  const { data, isLoading, error } = useGetUsers();

  const [nameFilter, setNameFilter] = useState("");
  const [banStatusFilter, setBanStatusFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);

  if (isLoading) return <Loading message={"Loading users ..."} />;
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

  const filteredUsers = data?.filter(
    (user) =>
      user.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (banStatusFilter === "all" ||
        (banStatusFilter === "banned" && user.banned) ||
        (banStatusFilter === "unbanned" && !user.banned)) &&
      (genderFilter === "all" || user.gender === genderFilter)
  );


  return (
    <div className="w-full">
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
          onClick={() => setFormOpen(true)}>
          Add User +
        </button>
      </div>
      <div className="flex justify-center gap-x-28 gap-y-4 mb-8 flex-wrap">
        <Input
          filter={nameFilter}
          setFilter={setNameFilter}
          placeholder="Search by name"
          name="Name"
        />

        <Filter
          title="Ban Status"
          selectedValue={banStatusFilter}
          options={[
            { label: "All", value: "all" },
            { label: "Banned", value: "banned" },
            { label: "Unbanned", value: "unbanned" },
          ]}
          onChange={setBanStatusFilter}
        />

        <Filter
          title="Gender"
          selectedValue={genderFilter}
          options={[
            { label: "All", value: "all" },
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
          onChange={setGenderFilter}
        />
      </div>

      {filteredUsers && filteredUsers.length > 0 ? (
        <CardsMenu creatures={filteredUsers} />
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-3xl text-gray-500">No users found!</p>
        </div>
      )}

      <Form
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
      />
    </div>
  );
}
