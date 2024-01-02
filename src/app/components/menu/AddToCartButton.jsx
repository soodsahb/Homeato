"use client";
import React from "react";
import FlyingButton from "react-flying-item";
import { useSession } from "next-auth/react";

const AddToCartButton = ({
  onAddToCart,
  hassizesorextras,
  basePrice,
  image,
}) => {
  const { status } = useSession();

  if (!hassizesorextras) {
    return (
      <div className="flying-button-container ">
        <FlyingButton
          src={image}
          targetTop={"5%"}
          targetLeft={"95%"}
          flyingItemStyling={{ width: "20rem" }}
        >
          <span
            className="text-sm font-bold flex  p-1.5 gap-2  whitespace-nowrap"
            onClick={() => {
              if (status === "authenticated") {
                onAddToCart();
              } else {
                window.location.replace("/login");
              }
            }}
          >
            ADD TO CART<span className="text-md font-bold">₹{basePrice}</span>
          </span>
        </FlyingButton>
      </div>
    );
  }
  return (
    <button
      className="bg-primary rounded-full  px-5 py-3 text-white mt-2 mx-auto flex items-center  gap-2  overflow-hidden"
      style={{ width: "95%" }}
      onClick={() => {
        if (status === "authenticated") {
          onAddToCart();
        } else {
          window.location.replace("/login");
        }
      }}
    >
      {" "}
      <span className="text-sm font-bold flex gap-2 p-1.5  whitespace-nowrap">
        FROM<span className="text-md font-bold">₹{basePrice}</span>
      </span>
    </button>
  );
};

export default AddToCartButton;
