"use client";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "../../material_tailwind";
import React, { useState } from "react";
import Modal from "../general/Modal";
import EditItem from "./EditItemPopup";

export default function ItemCardMenu({ item }) {
  const [edit, setEdit] = useState(false);
  
  return (
    <div>
      <Menu placement="left-end">
        <MenuHandler>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={() => setEdit(!edit)}>Edit</MenuItem>
          <MenuItem>Delete</MenuItem>
        </MenuList>
      </Menu>

      {edit && <EditItem isVisable={edit} onClose={() => setEdit(false)} item={item}/>}
    </div>
  );
}
