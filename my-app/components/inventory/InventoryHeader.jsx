import React from "react";
import { Typography, Select, Option, Button } from "../../material_tailwind";
import SearchBar from "./SearchBar";

export default function InventoryHeader() {
  return (
    <div className="px-10 py-10">
      <Typography variant="h1" className="text-center">
        Inventory
      </Typography>
      <div className="flex justify-between py-8">
        <div className="flex gap-4">
          <SearchBar />
          {/* <Select label="Filter">
            <Option></Option>
          </Select> */}
          <div className="">
            <Select label="Sort" size="lg">
              <Option>A-Z</Option>
              <Option>Z-A</Option>
              <Option>Newest to Oldest</Option>
              <Option>Oldest to Newest</Option>
            </Select>
          </div>
        </div>
        <Button>Add to Inventory</Button>
      </div>
    </div>
  );
}
