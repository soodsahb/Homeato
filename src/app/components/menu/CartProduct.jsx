import React from "react";
import { MdDelete } from "react-icons/md";
import Image from "next/image";

const CartProduct = ({
  product,
  cartProductPrice,
  removeCartProduct,
  index,
}) => {
  return (
    <div className="flex items-center gap-4  border-b py-4">
      <div className="w-24">
        <Image src={product.image} width={240} height={240}></Image>
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.itemName}</h3>

        {product.size && (
          <div className="text-sm ">
            Size:<span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map((extra) => (
              <div key={extra._id}>
                {extra.name} ₹{extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">₹{cartProductPrice(product)}</div>
      {!!removeCartProduct && (
        <div className="ml-2">
          <button type="button" onClick={() => removeCartProduct(index)}>
            <MdDelete className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CartProduct;
