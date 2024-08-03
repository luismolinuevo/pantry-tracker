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
  }, [userId, router]);
  return (
    <div className="">
      <InventoryHeader />
      {items &&
        items.length != 0 &&
        items.map((item) => <ItemCard item={item} />)}
    </div>
  );
}
