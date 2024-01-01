"use client";
import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import { useCheckAdmin } from "../components/CheckAdmin";
import { resolve } from "path";
import { toast } from "react-hot-toast";
import DeleteButton from "../components/Delete";

const CategoriesPage = () => {
  const { data: profileLoadingData, loading: profileLoading } = useCheckAdmin();
  const [category, setCategory] = useState();
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/category").then((res) => {
      res.json().then((categories) => {
        setFetchedCategory(categories);
      });
    });
  }

  async function handleCategory(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: category };

      if (editedCategory) {
        data._id = editedCategory._id;
      }

      const response = await fetch("/api/category", {
        body: JSON.stringify(data),
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
      });
      setEditedCategory(null);
      setCategory("");
      fetchCategories();
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating Category ⌛"
        : "Creating new Category ⌛",
      success: editedCategory ? "Category Updated 👏" : "Category Created 👏",
      error: "Error ...sorry 😔",
    });
  }

  async function handleCategoryDelete(_id) {
    const deletingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/category?_id=" + _id, {
        method: "DELETE",
      });

      if (response.ok) {
        resolve();
      } else reject();
    });

    await toast.promise(deletingPromise, {
      loading: "Deleting category! ⌛",
      success: "Category deleted 👏",
      error: "Deletion failed 😔",
    });
    fetchCategories();
  }

  if (profileLoading) {
    return "Loading Categories Info...";
  }
  if (!profileLoadingData.admin) {
    return "not admin....";
  }
  return (
    <>
      <section className="mt-8 max-w-lg mx-auto">
        {profileLoadingData.admin && (
          <UserTabs isAdmin={profileLoadingData.admin}></UserTabs>
        )}
        <form onSubmit={handleCategory}>
          <div className="flex items-end gap-2">
            <div className="grow">
              <label>
                {editedCategory ? "Update Category" : "Create Category"}
                {editedCategory && (
                  <>
                    :<b>{editedCategory.name}</b>
                  </>
                )}
              </label>
              <input
                type="text"
                value={category}
                onChange={(ev) => setCategory(ev.target.value)}
              />
            </div>
            <div className="pb-2 flex gap-1">
              <button type="submit" className=" border-primary border-2">
                {editedCategory ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditedCategory(null);
                  setCategory("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
          <div>
            <h2 className="my-2 text-sm text-gray-500">Existing Categories:</h2>
            {fetchedCategory?.length > 0 &&
              fetchedCategory.map((c) => (
                <div
                  key={c._id}
                  className=" rounded-lg flex py-2 px-4 gap-1 mb-2  bg-gray-100 items-center"
                >
                  <div className=" grow">{c.name}</div>
                  <div className="flex gap-1 items-center">
                    <button
                      onClick={() => {
                        setEditedCategory(c);
                        setCategory(c.name);
                      }}
                      type="button"
                      className="max-h-14 mt-2"
                    >
                      Edit
                    </button>

                    <DeleteButton
                      label="Delete"
                      onDelete={() => handleCategoryDelete(c._id)}
                    ></DeleteButton>
                  </div>
                </div>
              ))}
          </div>
        </form>
      </section>
    </>
  );
};

export default CategoriesPage;
