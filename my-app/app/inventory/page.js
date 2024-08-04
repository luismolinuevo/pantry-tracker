"use client";

import InventoryHeader from "@/components/inventory/InventoryHeader";
import { useEffect, useState } from "react";
import { getAllItems } from "../lib/items";
import { getCurrentUser } from "../lib/auth";
import { useRouter } from "next/navigation";
import ItemCard from "@/components/inventory/ItemCard";
import { Typography, Button } from "../../material_tailwind";

export default function Route() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [items, setItems] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [onChange, setOnChange] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUserId(user.uid);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Unable to get user id", error);
      }
    };

    fetchUserId();
  }, [router]);

  useEffect(() => {
    if (userId) {
      setItems([]);
      setLastDoc(null);
      fetchItems();
    }
  }, [userId, onChange, search]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      console.log("Fetching items...");
      const { items: newItems, lastDoc: newLastDoc } = await getAllItems(
        userId,
        search, // Assuming you're not searching for now
        "A-Z", // Sort order
        lastDoc, // Pagination
        3 // items per page
      );
      console.log("Fetched items:", newItems);
      setItems((prevItems) => [...prevItems, ...newItems]);
      setLastDoc(newLastDoc);
      // Check if the number of items fetched is less than the requested itemsPerPage
      setHasMore(newItems.length === 3); // Consistent with itemsPerPage
    } catch (error) {
      console.error("Unable to fetch items", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreItems = () => {
    if (hasMore && !loading) {
      fetchItems();
    }
  };

  return (
    <div className="px-10 py-10">
      <InventoryHeader setSearch={setSearch} />
      <div className="flex flex-wrap gap-6 justify-center">
        {items.length > 0 ? (
          items.map((item, index) => (
            <ItemCard
              item={item}
              key={index}
              setOnChange={setOnChange}
              onChange={onChange}
            />
          ))
        ) : (
          <Typography>No items found.</Typography>
        )}
      </div>
      {loading && (
        <div className="flex justify-center">
          <Typography>Loading...</Typography>
        </div>
      )}
      {hasMore && !loading && (
        <div className="flex justify-center my-12">
          <Button onClick={loadMoreItems}>Load More</Button>
        </div>
      )}
    </div>
  );
}
