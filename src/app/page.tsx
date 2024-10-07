"use client";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center fixed top-1/2 overflow-hidden">
      <div className="flex gap-20">
        <Link href="/users">
          <button className="px-12 py-8 text-4xl font-bold text-white bg-gray-400 rounded-lg hover:bg-gray-600">
            Users
          </button>
        </Link>
        <Link href="/animals">
          <button className="px-12 py-8 text-4xl font-bold text-white bg-gray-400 rounded-lg hover:bg-gray-600">
            Animals
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
