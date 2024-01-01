"use client";

import React from "react";

import { useState, useEffect } from "react";
import MenuItem from "../components/menu/MenuItem";
import SectionHeaders from "../components/layout/SectionHeaders";

const MenuPage = () => {
  const [menuitems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => res.json())
      .then((items) => {
        setMenuItems(items);
      });
  }, []);
  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((categories) => {
        setCategories(categories);
      });
  }, []);
  return (
    <section className=" mt-8">
      {categories.map((c) => (
        <div key={c._id}>
          <div>
            <SectionHeaders mainHeader={c.name}></SectionHeaders>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
            {menuitems
              .filter((item) => item.category === c.name)
              .map((item, index) => (
                <MenuItem
                  itemName={item.itemName}
                  basePrice={item.basePrice}
                  description={item.description}
                  image={item.image}
                  sizes={item.sizes}
                  extraingredients={item.extraingredients}
                  key={item._id}
                ></MenuItem>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default MenuPage;
