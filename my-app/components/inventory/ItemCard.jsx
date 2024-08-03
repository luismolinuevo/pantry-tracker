"use client";

import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "../../material_tailwind";
import React from "react";
import ItemCardMenu from "./ItemCardMenu";

export default function ItemCard({ item, onChange, setOnChange }) {
  return (
    <div className="w-[300px] md:w-[700px] border-[1px] border-black mx-10 my-10 px-5 py-5 rounded-xl">
      <div className="flex justify-between items-center">
        <div>
          <Typography className="text-center text-[20px]">Item Name</Typography>
          <Typography className="text-center text-[25px]">
            {item?.name}
          </Typography>
        </div>
        <div>
          <Typography className="text-center text-[20px]">Count</Typography>
          <Typography className="text-center text-[25px]">
            {item?.count}
          </Typography>
        </div>
        <div>
          <Typography className="text-center text-[20px]">
            Price Per Item
          </Typography>
          <Typography className="text-center text-[25px]">
            {item?.price}
          </Typography>
        </div>
        <ItemCardMenu
          item={item}
          setOnChange={setOnChange}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
