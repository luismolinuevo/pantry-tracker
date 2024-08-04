import React from "react";
import { Input } from "../../material_tailwind";

export default function SearchBar({ setSearch }) {
  return (
    <div className="">
      <Input
        label="Search for item"
        size="lg"
        className="w-[400px]"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
