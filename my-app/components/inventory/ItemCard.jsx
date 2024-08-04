"use client";

import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "../../material_tailwind";
import React from "react";
import ItemCardMenu from "./ItemCardMenu";

export default function ItemCard({ item, onChange, setOnChange }) {
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
