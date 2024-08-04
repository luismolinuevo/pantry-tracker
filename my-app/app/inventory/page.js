"use client";

import InventoryHeader from "@/components/inventory/InventoryHeader";
import { useEffect, useState } from "react";
import { getAllItems } from "../lib/items";
import { getCurrentUser } from "../lib/auth";
import { useRouter } from "next/navigation";
import ItemCard from "@/components/inventory/ItemCard";

export default function route() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [items, setItems] = useState([]);
  const [onChange, setOnChange] = useState(false);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUserId(user.uid);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.log("Unable to get user id", error);
      }
    };

    const fetchItems = async () => {
      try {
        if (!userId) {
          console.log("No user id provided");
        }

        const items = await getAllItems(userId);

        if (!items) {
          console.log("No items fetched");
        }

        setItems(items);
        console.log(items);
      } catch (error) {
        console.log("Unable to get user items", error);
      }
    };

    getUserId();
    fetchItems();
  }, [userId, router, onChange]);

  return (
    <div className="px-10 py-10">
      <InventoryHeader />
      <div className="flex flex-wrap gap-6 justify-center">
        {items &&
          items.length != 0 &&
          items.map((item, index) => (
            <ItemCard
              item={item}
              key={index}
              onChange={onChange}
              setOnChange={setOnChange}
            />
          ))}
      </div>
    </div>
  );
}
