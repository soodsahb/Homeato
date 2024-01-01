import React from "react";
import FlyingButton from "react-flying-item";

const AddToCartButton = ({
  onAddToCart,
  hassizesorextras,
  basePrice,
  image,
}) => {
  if (!hassizesorextras) {
    return (
      <div className="flying-button-container ">
        <FlyingButton
          src={image}
          targetTop={"5%"}
          targetLeft={"95%"}
          flyingItemStyling={{ width: "20rem" }} // Add this line
        >
          <span
            className="text-sm font-bold flex  p-1.5 gap-2  whitespace-nowrap"
            onClick={() => onAddToCart()}
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
      onClick={() => onAddToCart()}
    >
      {" "}
      <span className="text-sm font-bold flex gap-2 p-1.5  whitespace-nowrap">
        FROM<span className="text-md font-bold">₹{basePrice}</span>
      </span>
    </button>
  );
};

export default AddToCartButton;
