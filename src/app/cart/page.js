"use client";
import React from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import { useContext } from "react";
import { CartContext } from "../components/AppContext";
import Link from "next/link";

import { useEffect, useState } from "react";

import AddressInputs from "../components/layout/AddressInputs";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import CartProduct from "../components/menu/CartProduct";

const CartPage = () => {
  const { status } = useSession();
  const [user, setUser] = useState(null);
  const isLoading = status === "loading";

  const { cartProducts, cartProductPrice, removeCartProduct } =
    useContext(CartContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed 😔");
      }
    }
  }, []);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
        setPhone(user?.phone);
        setAddress(user?.address);
        setPincode(user?.pincode);
        setCountry(user?.country);
        setCity(user?.city);
      });
  }, []);
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [pincode, setPincode] = useState(user?.pincode);
  const [country, setCountry] = useState(user?.country || "");
  const [city, setCity] = useState(user?.city);
  let total = 0;
  for (const product of cartProducts) {
    total += cartProductPrice(product);
  }

  async function proceedToCheckOut(ev) {
    ev.preventDefault();

    const paymentPromise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          phone,
          pincode,
          country,
          city,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          const link = await response.json();

          window.location.replace(link);
        } else {
          reject();
        }
      });
    });

    await toast.promise(paymentPromise, {
      success: "Redirecting!",
      loading: "Select country as USA",
      error: "Sorry Error occured",
    });
  }

  if (cartProducts.length === 0) {
    return (
      <div className="flex items-center flex-col mt-16 justify-center">
        Your Cart is Empty😔
        <Link
          href={"/menu"}
          style={{ color: "#fff", borderRadius: "9999px" }}
          className="button mt-8 max-w-md bg-primary text-white "
        >
          Add Some {"      "}🛒
        </Link>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <>Please login</>;
  }
  return (
    <section className="mt-8">
      <SectionHeaders mainHeader={"Cart"}></SectionHeaders>
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div>
          {cartProducts.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                key={index}
                product={product}
                cartProductPrice={cartProductPrice}
                removeCartProduct={removeCartProduct}
                index={index}
              ></CartProduct>
            ))}
          {total > 0 && (
            <div className=" justify-end pr-16 py-2 flex items-center">
              <div className="text-gray-500">
                Subtotal:
                <br />
                Delivery:
                <br />
                Total:
              </div>
              <div className="font-semibold pl-2 text-right">
                ₹{total}
                <br />
                ₹40
                <br />₹{total > 0 ? total + 40 : 0}
              </div>
            </div>
          )}
        </div>
        {cartProducts.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-lg max-h-[400px]">
            <h2>Checkout</h2>
            <form onSubmit={proceedToCheckOut}>
              <label>Address</label>
              <input
                type="text"
                placeholder="Street Address"
                value={address}
                onChange={(ev) => setAddress(ev.target.value)}
              />
              <AddressInputs
                phone={phone}
                setPhone={setPhone}
                pincode={pincode}
                setPincode={setPincode}
                city={city}
                setCity={setCity}
                country={country}
                setCountry={setCountry}
              ></AddressInputs>
              <button type="submit" className="">
                Pay ₹{total > 0 ? total + 40 : 0}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
