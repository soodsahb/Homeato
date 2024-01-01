"use client";

import React, { useState } from "react";
import UserTabs from "../../components/layout/UserTabs";
import { useCheckAdmin } from "../../components/CheckAdmin";
import UploadImage from "../../components/UploadImage";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { redirect } from "next/navigation";
import MenuItemForm from "../../components/layout/MenuItemForm";

export default function NewMenuItemsPage() {
  const { data, loading } = useCheckAdmin();
  const [image, setImage] = useState();
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [redirectToItems, setRedirectToItems] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [extraingredients, setextraingredients] = useState([]);
  const [category, setselectedcategory] = useState("Choose category");

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
      sizes,
      extraingredients,
      category,
    };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setRedirectToItems(true);
        resolve();
      } else reject();
    });

    toast.promise(savingPromise, {
      loading: "Saving item ⌛",
      success: "Item saved 👍",
      error: "Saving failed 😔",
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
        category={category}
        setselectedcategory={setselectedcategory}
      ></MenuItemForm>
    </section>
  );
}
