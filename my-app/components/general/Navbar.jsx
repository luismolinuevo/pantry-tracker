"use client";

import React, { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "../../material_tailwind";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logOut } from "@/app/lib/auth";
import { getCurrentUser } from "@/app/lib/auth";
import { Collapse } from "@material-tailwind/react";

export function StickyNavbar() {
  const router = useRouter();
  const [openNav, setOpenNav] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

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

    getUserId();
  }, [router]);

  const logUserOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log("Unable to logout user");
    }
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="/inventory" className="flex items-center">
          Inventory
        </Link>
      </Typography>
    </ul>
  );

  const authList = userId ? (
    <div className="flex items-center gap-x-1">
      <Button
        variant="gradient"
        size="sm"
        className="lg:inline-block"
        onClick={logUserOut}
      >
        <span>Logout</span>
      </Button>
    </div>
  ) : (
    <div className="flex items-center gap-x-1">
      <Button
        variant="text"
        size="sm"
        className="lg:inline-block"
        onClick={() => router.push("/login")}
      >
        <span>Log In</span>
      </Button>
      <Button
        variant="gradient"
        size="sm"
        className="lg:inline-block"
        onClick={() => router.push("/signup")}
      >
        <span>Sign Up</span>
      </Button>
    </div>
  );

  return (
    <div className="max-h-[768px]">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900 px-6">
          <Typography className="mr-4 cursor-pointer py-1.5 font-medium">
            <Link href={"/"}>Inventory Tracker</Link>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="hidden lg:block">{authList}</div>
            {/* {!userId ? (
              <div className="flex items-center gap-x-1">
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={() => router.push("/login")}
                >
                  <span>Log In</span>
                </Button>
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={() => router.push("/signup")}
                >
                  <span>Sign up</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-x-1">
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={logUserOut}
                >
                  <span>Logout</span>
                </Button>
              </div>
            )} */}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex flex-col gap-2 lg:hidden">
            <div className="py-2">{authList}</div>
          </div>

          {/* <div className="flex items-center gap-x-1">
            <Button
              fullWidth
              variant="text"
              size="sm"
              className=""
              onClick={() => router.push("/login")}
            >
              <span>Log In</span>
            </Button>
            <Button
              fullWidth
              variant="gradient"
              size="sm"
              className=""
              onClick={() => router.push("/signup")}
            >
              <span>Sign up</span>
            </Button>
          </div> */}
        </Collapse>
      </Navbar>
    </div>
  );
}
