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
import DeleteItemPopup from "./DeleteItemPopup";

export default function ItemCardMenu({ item, onChange, setOnChange }) {
  const [editItem, setEditItem] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);

  return (
    <div>
      <Menu placement="left-end">
        <MenuHandler>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={() => setEditItem(true)}>Edit</MenuItem>
          <MenuItem onClick={() => setDeleteItem(true)}>Delete</MenuItem>
        </MenuList>
      </Menu>

      {editItem && (
        <EditItem
          isVisible={editItem}
          onClose={() => setEditItem(false)}
          item={item}
          onChange={onChange}
          setOnChange={setOnChange}
        />
      )}

      {deleteItem && (
        <DeleteItemPopup
          isVisible={deleteItem}
          onClose={() => setDeleteItem(false)}
          item_id={item?.id}
          onChange={onChange}
          setOnChange={setOnChange}
        />
      )}
    </div>
  );
}
