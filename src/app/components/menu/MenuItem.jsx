"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import { useState } from "react";
import MenuItemTile from "./MenuItemTile";
import FlyingButton from "react-flying-item";

const MenuItem = (menuitem) => {
  const { itemName, description, basePrice, image, sizes, extraingredients } =
    menuitem;
  const { addToCart } = useContext(CartContext);
  const [popup, setPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  async function addToCartButtonClick() {
    console.log(menuitem);
    const hasoptions = sizes.length > 0 || extraingredients.length > 0;
    if (hasoptions && !popup) {
      setPopup(true);
      return;
    }
    addToCart(menuitem, selectedSize, selectedIngredients);
    try {
      // Use a more explicit delay using a promise
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log("hiding popup");
      setPopup(false);
      toast.success("Added to Cart");
      setSelectedIngredients([]);
    } catch (error) {
      console.error("Error in addToCartButtonClick:", error);
    }
  }

  function handleAddExtras(ev, extras) {
    const checked = ev.target.checked;

    if (checked) {
      setSelectedIngredients((prev) => [...prev, extras]);
    } else {
      setSelectedIngredients((prev) => {
        return prev.filter((i) => i.name !== extras.name);
      });
    }
  }
  let selectedPrice = basePrice;

  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedIngredients?.length > 0) {
    for (const extra of selectedIngredients) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {popup && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center "
          onClick={() => {
            setPopup(false);
            setSelectedSize(sizes?.[0]);
            setSelectedIngredients([]);
          }}
        >
          {" "}
          <div
            className="my-8 rounded-lg max-w-md w-full  overflow-hidden"
            onClick={(ev) => ev.stopPropagation()}
          >
            <div
              className="bg-white p-4 overflow-scroll scrollbar-hide  "
              style={{ maxHeight: "calc(100vh - 40px)", overflowY: "auto" }}
            >
              <Image
                className="mx-auto"
                src={image}
                alt="img"
                height={200}
                width={300}
              ></Image>
              <h2 className="font-bold text-center text-xl">{itemName}</h2>
              <p className="max-w-md text-center text-gray-500 text-sm my-2">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className=" p-2">
                  <h3 className="mb-1 text-center text-gray-700">
                    Pick Your Size
                  </h3>
                  {sizes.map((size) => (
                    <label className="flex gap-1 items-center p-2 border rounded-md mb-2">
                      <input
                        type="radio"
                        name="size"
                        onClick={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                      />{" "}
                      {size.name} ₹{basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraingredients?.length > 0 && (
                <div className="p-2">
                  <h3 className="mb-1 text-center text-gray-700">
                    Pick Extra-Ingredients
                  </h3>
                  {extraingredients.map((ingredient) => (
                    <label className="flex gap-1 items-center p-2 border rounded-md mb-2">
                      <input
                        type="checkbox"
                        name={ingredient.name}
                        onClick={(ev) => handleAddExtras(ev, ingredient)}
                      />{" "}
                      {ingredient.name} +₹{ingredient.price}
                    </label>
                  ))}
                </div>
              )}
              <div className="uppercase flying-button-container sticky bottom-2 ">
                <FlyingButton
                  src={image}
                  targetTop={"5%"}
                  targetLeft={"95%"}
                  flyingItemStyling={{ width: "20rem" }}
                  animationDuration={0.4}
                >
                  <div
                    className="uppercase w-full"
                    onClick={() => {
                      addToCartButtonClick();
                      setSelectedSize(sizes?.[0]);
                    }}
                  >
                    Add To Cart &nbsp;₹{selectedPrice}
                  </div>
                </FlyingButton>
              </div>

              <button
                className="button mt-2"
                onClick={() => {
                  setPopup(false);
                  setSelectedSize(sizes?.[0]);
                  setSelectedIngredients([]);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <MenuItemTile
        onAddToCart={addToCartButtonClick}
        {...menuitem}
      ></MenuItemTile>
    </>
  );
};

export default MenuItem;
