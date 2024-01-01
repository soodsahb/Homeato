"use client";
import React, { useEffect, useState } from "react";

import { useCheckAdmin } from "../components/CheckAdmin";
import UserTabs from "../components/layout/UserTabs";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

const MenuItemsPage = () => {
  const { data, loading } = useCheckAdmin();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data);
      });
  }, []);

  if (loading) {
    return "Loading Menu Items...";
  }
  if (!data.admin) {
    return "Not admin...";
  }
  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={data.admin}></UserTabs>

      <div className="mt-8">
        <Link
          href={"/menu-items/new"}
          className="button flex items-center gap-2"
        >
          Create new Item
          <FaArrowRight />
        </Link>
      </div>
      <h2 className="text-sm text-gray-500 mt-4">Edit menu items:</h2>
      <div className="grid grid-cols-3 gap-2">
        {menuItems?.length > 0 &&
          menuItems.map((item) => {
            return (
              <Link
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4"
              >
                <div className="relative flex justify-center">
                  <Image
                    className="rounded-md"
                    src={item.image}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center">{item.itemName}</div>
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default MenuItemsPage;
