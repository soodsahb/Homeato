"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

const HomeMenu = () => {
  const [menuitems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => res.json())
      .then((items) => {
        items = items.slice(0, 3);
        setMenuItems(items);
      });
  }, []);
  return (
    <section className="">
      <div className="absolute  left-0 right-0 w-full justify-start">
        <div className=" absolute -top-24 left-0 bg-transparent -z-10">
          <Image src={"/sallad1.png"} width={109} height={189}></Image>
        </div>
        <div className="  absolute right-0 -top-36  bg-transparent -z-10">
          <Image src={"/sallad2.png"} width={107} height={195}></Image>
        </div>
      </div>

      <SectionHeaders
        subHeader={"Check Out "}
        mainHeader={"Our Delicious Bestsellers"}
      ></SectionHeaders>
      <div className="grid sm:grid-cols-3 gap-4">
        {menuitems.map((item) => (
          <MenuItem
            itemName={item.itemName}
            basePrice={item.basePrice}
            description={item.description}
            image={item.image}
            sizes={item.sizes}
            extraingredients={item.extraingredients}
          ></MenuItem>
        ))}
      </div>
    </section>
  );
};

export default HomeMenu;
