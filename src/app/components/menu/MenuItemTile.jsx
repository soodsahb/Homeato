import React from "react";
import Image from "next/image";
import AddToCartButton from "../menu/AddToCartButton";

const MenuItemTile = ({ onAddToCart, ...item }) => {
  const { image, itemName, description, basePrice, sizes, extraingredients } =
    item;
  const hassizesorextras = sizes?.length > 0 || extraingredients?.length > 0;
  return (
    <div className=" hover:bg-white transition-all hover:shadow-md hover:shadow-black/25 menuitem my-auto flex flex-col items-center h-[450px] overflow-hidden">
      <div className="text-center ">
        <Image
          src={image}
          height={100}
          width={189}
          className="block mx-auto"
          alt="image"
        ></Image>
      </div>

      <h4 className="font-semibold my-4 text-xl h-[40px] ">{itemName}</h4>
      <p className=" text-gray-500 text-sm my-1  line-clamp-3 ">
        {description}
      </p>
      <AddToCartButton
        onAddToCart={onAddToCart}
        basePrice={basePrice}
        hassizesorextras={hassizesorextras}
        image={image}
      ></AddToCartButton>
    </div>
  );
};

export default MenuItemTile;
