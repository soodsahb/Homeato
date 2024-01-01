"use client";
import React, { useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import { useEffect } from "react";
import UserTabs from "../components/layout/UserTabs";
import { useCheckAdmin } from "../components/CheckAdmin";
import { dbTime } from "../../libs/datetimefunction";
import Link from "next/link";
import { useSession } from "next-auth/react";

const AllOrders = () => {
  const session = useSession();
  const status = session.status;

  const [orders, setOrders] = useState([]);
  const { data, loading } = useCheckAdmin();
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  function fetchOrder() {
    setLoadingOrders(true);

    fetch("/api/orders").then((res) => {
      if (res) {
        res.json().then((ordersinfo) => {
          setOrders(ordersinfo.reverse());
          setLoadingOrders(false);
        });
      }
    });
  }

  if (loading) {
    return "Loading...";
  }
  if (!loading && status === "unauthenticated") {
    return window.location.replace("/login");
  }

  return (
    <section className="mt-8 mx-auto max-w-3xl">
      <UserTabs isAdmin={data.admin}></UserTabs>
      {loadingOrders && <div>Loading Orders...</div>}
      <div className="text-center mt-4 mb-2">
        <SectionHeaders mainHeader={"Orders"}></SectionHeaders>
      </div>
      <div className="flex flex-col mt-4 ">
        {orders?.length > 0 &&
          orders?.map((order) => (
            <div
              key={order._id}
              className="bg-gray-100 mb-2 rounded-lg p-4 grid grid-cols-3 gap-12"
            >
              <div className={" text-center flex items-center justify-center"}>
                <span
                  className={
                    (order.paid ? "bg-green-500 " : "bg-red-400 ") +
                    "p-3 rounded-md text-white w-24"
                  }
                >
                  {order.paid ? "Paid" : "Not Paid"}
                </span>
              </div>

              <div className=" flex flex-col justify-center gap-1">
                <div className="flex justify-start">{order.userEmail}</div>
                <div className="flex justify-start text-gray-500 text-xs md:text-sm">
                  {order.cartProducts.map((p) => p.itemName).join(", ")}
                </div>
              </div>

              <div className="text-right flex items-center gap-3 justify-end whitespace-nowrap text-gray-500">
                <span className="hidden md:block">
                  {" "}
                  {dbTime(order.createdAt)}
                </span>

                <Link
                  href={"/orders/" + order._id}
                  className=" bg-primary rounded-full text-white p-4 font-semibold"
                >
                  Show Order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default AllOrders;
