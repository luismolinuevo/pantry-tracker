"use client";

import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "../../material_tailwind";
import React from "react";
import ItemCardMenu from "./ItemCardMenu";

export default function ItemCard({ item, onChange, setOnChange }) {
  // return (
  //   <div className="w-[300px] md:w-[700px] border-[1px] border-black mx-10 my-10 px-5 py-5 rounded-xl">
  //     <div className="flex justify-between items-center">
  //       <div>
  //         <Typography className="text-center text-[20px]">Item Name</Typography>
  //         <Typography className="text-center text-[25px]">
  //           {item?.name}
  //         </Typography>
  //       </div>
  //       <div>
  //         <Typography className="text-center text-[20px]">Count</Typography>
  //         <Typography className="text-center text-[25px]">
  //           {item?.count}
  //         </Typography>
  //       </div>
  //       <div>
  //         <Typography className="text-center text-[20px]">
  //           Price Per Item
  //         </Typography>
  //         <Typography className="text-center text-[25px]">
  //           {item?.price}
  //         </Typography>
  //       </div>
  //       <ItemCardMenu
  //         item={item}
  //         setOnChange={setOnChange}
  //         onChange={onChange}
  //       />
  //     </div>
  //   </div>
  // );
  return (
    <Card className="mt-6 w-80">
      <CardHeader color="blue-gray" className="relative h-48">
        <img
          src={item?.imageUrl ? item?.imageUrl : "/ItemPlaceHolder.png"}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {item?.name}
        </Typography>
        <Typography>
          <span>Count: </span>
          {item?.count}
        </Typography>
        <Typography>
          <span>Price: </span>
          {item?.price}
        </Typography>
        <Typography></Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <ItemCardMenu
          item={item}
          setOnChange={setOnChange}
          onChange={onChange}
        />
      </CardFooter>
    </Card>
  );
}
