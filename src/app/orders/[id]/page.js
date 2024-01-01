"use client";

import React, { useContext, useEffect, useState } from "react";
import SectionHeaders from "../../components/layout/SectionHeaders";
import { CartContext } from "../../components/AppContext";
import { useParams } from "next/navigation";
import AddressInputs from "../../components/layout/AddressInputs";
import CartProduct from "../../components/menu/CartProduct";

const OrderPage = () => {
  const { clearCart, cartProductPrice } = useContext(CartContext);
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [address, setAddress] = useState(order?.address || "");
  const [loadingOrder, setLoadingOrder] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }

    if (id) {
      setLoadingOrder(true);
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      });
    }
  }, []);

  useEffect(() => {
    // Fetch user data from the database (replace with your actual API endpoint)
    fetch("/api/profile") // Update the API endpoint as needed
      .then((res) => res.json())
      .then((userData) => {
        // Update state variables with user data
        setAddress(userData?.address || "");
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  let SubTotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      SubTotal += cartProductPrice(product);
    }
  }

  if (loadingOrder) {
    return <div>Loading order info...</div>;
  }

  return (
    <section className="mt-8 mx-auto max-w-2xl ">
      <div className="text-center">
        <SectionHeaders mainHeader={"Your order"}></SectionHeaders>

        {order?.paid ? (
          <div className="mt-4">
            <p>Your order has been placed successfully 👍</p>
            <p>It will be delivered shortly🏍️💨</p>
          </div>
        ) : (
          <div className="mt-4">
            <p>Your Payment was Failed 😔</p>
            <p>Try Again 👍</p>
          </div>
        )}
      </div>
      {order && (
        <div
          className="grid md:grid-cols-2 md:gap-16 mt-10"
          style={{ width: "800px" }}
        >
          <div style={{ width: "350px" }}>
            {order.cartProducts.map((product) => (
              <CartProduct
                key={product._id}
                product={product}
                cartProductPrice={cartProductPrice}
              ></CartProduct>
            ))}
            <div className="text-right py-3 text-gray-500">
              Subtotal:{" "}
              <span className="text-black font-bold inline-block w-10 ">
                ₹{SubTotal}
              </span>
              <br />
              Delivery:{" "}
              <span className="text-black font-bold inline-block w-10">
                ₹40
              </span>
              <br />
              Total:{" "}
              <span className="text-black font-bold inline-block w-10">
                ₹{SubTotal + 40}
              </span>
              <br />
            </div>
          </div>

          <div className="w-[400px]">
            <div className="bg-gray-100 rounded-lg p-4">
              <label>Address</label>
              <input
                type="text"
                placeholder="Street Address"
                value={address}
                disabled={true}
                onChange={(ev) => setAddress(ev.target.value)}
              />
              <AddressInputs {...order} disabled={true}></AddressInputs>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
