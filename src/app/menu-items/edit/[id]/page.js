"use client";

import React, { useEffect, useState } from "react";
import UserTabs from "../../../components/layout/UserTabs";
import { useCheckAdmin } from "../../../components/CheckAdmin";
import UploadImage from "../../../components/UploadImage";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "../../../components/layout/MenuItemForm";

export default function EditMenuItemsPage() {
  const { data, loading } = useCheckAdmin();
  const [image, setImage] = useState();
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [redirectToItems, setRedirectToItems] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [extraingredients, setextraingredients] = useState([]);
  const { id } = useParams();
  const [category, setselectedcategory] = useState("Choose Category");

  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => res.json())
      .then((items) => {
        const item = items.find((i) => i._id === id);
        setItemName(item.itemName);
        setDescription(item.description);
        setBasePrice(item.basePrice);
        setImage(item.image);
        setSizes(item.sizes);
        setextraingredients(item.extraingredients);
        setselectedcategory(item?.category);
      });
  }, []);

  function addSize() {
    setSizes((oldSizes) => {
      return [...oldSizes, { name: "", price: 0 }];
    });
  }
  function addIngredients() {
    setextraingredients((oldingredients) => {
      return [...oldingredients, { name: "", price: 0 }];
    });
  }

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const data = {
      itemName,
      description,
      basePrice,
      image,
      id,
      sizes,
      extraingredients,
      category,
    };
    const updatingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setRedirectToItems(true);
        resolve();
      } else reject();
    });

    toast.promise(updatingPromise, {
      loading: "Editing item ⌛",
      success: "Item updated 👍",
      error: "Editing failed 😔",
    });
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Loading...";
  }
  if (!data.admin) {
    return "Not an admin...";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={data.admin}></UserTabs>
      <div className=" max-w-md mx-auto mt-3">
        <Link className="button" href={"/menu-items"}>
          <span className="flex items-center gap-2">
            <FaArrowLeft /> Show all menu items
          </span>
        </Link>
      </div>
      <MenuItemForm
        handleFormSubmit={handleFormSubmit}
        image={image}
        setImage={setImage}
        itemName={itemName}
        setItemName={setItemName}
        description={description}
        setDescription={setDescription}
        basePrice={basePrice}
        setBasePrice={setBasePrice}
        sizes={sizes}
        setSizes={setSizes}
        addSize={addSize}
        extraingredients={extraingredients}
        setextraingredients={setextraingredients}
        addIngredients={addIngredients}
        id={id}
        category={category}
        setselectedcategory={setselectedcategory}
      ></MenuItemForm>
    </section>
  );
}
