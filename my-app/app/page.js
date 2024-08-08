"use client";

import { useEffect, useState } from "react";
import DemoLogin from "@/components/general/DemoLogin";
import { Typography, Button } from "../material_tailwind";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "./lib/auth";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUser(user.uid);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Unable to get user id", error);
      }
    };

    fetchUserId();
  }, [router]);

  return (
    <main className="flex items-center h-full px-10 py-10">
      <div className="flex justify-between gap-6 flex-col lg:flex-row">
        <div>
          <Typography variant="h1" className="md:text-[40px] lg:text-[45px]">
            Pantry Tracker
          </Typography>
          <Typography className="text-[25px] mb-5">
            A Pantry Tracker is a convenient app that helps you manage your
            pantry inventory, track expiration dates, and plan meals
            efficiently. Stay organized and reduce food waste by knowing exactly
            what you have on hand. Perfect for keeping your kitchen stocked and
            your shopping list updated!
          </Typography>
          {user ? (
            <Button onClick={() => router.push("/inventory")}>Inventory</Button>
          ) : (
            <div className="flex gap-6">
              <Button onClick="/login">Login</Button>
              <DemoLogin />
            </div>
          )}
        </div>
        <img src="/Landingpage.jpeg" className="w-[[50%]] h-[300px] md:h-[400px]" />
      </div>
    </main>
  );
}
