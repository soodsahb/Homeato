import UploadImage from "../UploadImage";
import { FaTrash } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { FaArrowDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import toast from "react-hot-toast";
import { redirect } from "next/dist/server/api-utils";
import DeleteButton from "../Delete";
import { usePathname } from "next/navigation";

export default function MenuItemForm({
  handleFormSubmit,
  image,
  setImage,
  itemName,
  setItemName,
  description,
  setDescription,
  basePrice,
  setBasePrice,
  sizes,
  setSizes,
  addSize,
  extraingredients,
  setextraingredients,
  addIngredients,
  id,
  category,
  setselectedcategory,
}) {
  const pathname = usePathname();
  const [selectcategories, setselectcategories] = useState([]);

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((categories) => {
        setselectcategories(categories);
      });
  }, []);

  function editSize(ev, index, prop) {
    const newvalue = ev.target.value;
    setSizes((prevsizes) => {
      const newsizes = [...prevsizes];
      newsizes[index][prop] = newvalue;
      return newsizes;
    });
  }

  function editIngredients(ev, index, prop) {
    const newvalue = ev.target.value;
    setextraingredients((prevsingredients) => {
      const newsingredients = [...prevsingredients];
      newsingredients[index][prop] = newvalue;
      return newsingredients;
    });
  }

  function removeSize(index) {
    setSizes((prev) => prev.filter((v, i) => i !== index));
  }

  function removeIngredients(index) {
    setextraingredients((prev) => prev.filter((v, i) => i !== index));
  }

  const [arrowclicked, setArrowClicked] = useState(false);
  const [iarrowclicked, setiArrowClicked] = useState(false);

  async function handleDeleteItem(id) {
    const deletingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(deletingPromise, {
      loading: "deleting ⌛",
      success: "Item Deleted 👍",
      error: "Deletion failed",
    });

    window.location.replace("/menu-items");
  }

  return (
    <form className="mt-8 mx-auto max-w-md" onSubmit={handleFormSubmit}>
      <div
        className="md:grid gap-4 items-start "
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <UploadImage link={image} setLink={setImage}></UploadImage>
        </div>

        <div className="grow">
          <label>Menu item name</label>
          <input
            type="text"
            value={itemName}
            onChange={(ev) => setItemName(ev.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <select
            className="block"
            value={category}
            onChange={(ev) => setselectedcategory(ev.target.value)}
          >
            {selectcategories?.length > 0 &&
              selectcategories.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
          </select>
          <label>Base Price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />
          <div className="bg-gray-200 p-2 rounded-md mb-2 ">
            <div className="flex items-center gap-1  justify-between flex-row-reverse">
              <button
                type="button"
                className="max-w-[80px]"
                onClick={() => setArrowClicked((prev) => !prev)}
              >
                {arrowclicked ? <FaArrowUp /> : <FaArrowDown />}
              </button>
              <h3 className="text-gray-700 gap-1 flex font-semibold">
                Size <span>({sizes.length})</span>
              </h3>
            </div>
            {arrowclicked &&
              sizes.length > 0 &&
              sizes.map((size, index) => (
                <>
                  <div key={size._id} className="flex gap-2 items-end ">
                    <div>
                      <label>Size</label>
                      <input
                        type="text"
                        placeholder="Size name"
                        value={size.name}
                        onChange={(ev) => editSize(ev, index, "name")}
                      />
                    </div>
                    <div>
                      <label>Extra Price</label>
                      <input
                        type="text"
                        placeholder="Price "
                        className="rounded-lg border border-gray-500 max-w-[140px] mb-3 text-center"
                        value={size.price}
                        onChange={(ev) => editSize(ev, index, "price")}
                      />
                    </div>

                    <div>
                      <button
                        className="bg-white mb-3 px-3 py-2.5"
                        type="button"
                        onClick={() => removeSize(index)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </>
              ))}
            {arrowclicked ? (
              <button
                type="button"
                className=" bg-white items-center"
                onClick={addSize}
              >
                <IoIosAdd /> Add item Size
              </button>
            ) : (
              <></>
            )}
          </div>

          <div className="bg-gray-200 p-2 rounded-md mb-2">
            <div className="flex items-center gap-1  justify-between flex-row-reverse">
              <button
                type="button"
                className="max-w-[80px]"
                onClick={() => setiArrowClicked((prev) => !prev)}
              >
                {iarrowclicked ? <FaArrowUp /> : <FaArrowDown />}
              </button>
              <h3 className="text-gray-700 gap-1 flex font-semibold">
                Ingredients <span>({extraingredients.length})</span>
              </h3>
            </div>
            {iarrowclicked &&
              extraingredients?.length > 0 &&
              extraingredients.map((ingredient, index) => (
                <>
                  <div className="flex gap-2 items-end ">
                    <div>
                      <input
                        type="text"
                        placeholder="Ingredient name"
                        value={ingredient.name}
                        onChange={(ev) => editIngredients(ev, index, "name")}
                      />
                    </div>
                    <div>
                      <label>Extra Price</label>
                      <input
                        type="text"
                        placeholder="Price "
                        className="rounded-lg border border-gray-500 max-w-[140px] mb-3 text-center"
                        value={ingredient.price}
                        onChange={(ev) => editIngredients(ev, index, "price")}
                      />
                    </div>

                    <div>
                      <button
                        className="bg-white mb-3 px-3 py-2.5"
                        type="button"
                        onClick={() => removeIngredients(index)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </>
              ))}
            {iarrowclicked ? (
              <button
                type="button"
                className=" bg-white items-center"
                onClick={addIngredients}
              >
                <IoIosAdd /> Add Ingredients
              </button>
            ) : (
              <></>
            )}
          </div>
          <button type="submit">Save</button>
          {pathname.startsWith("/menu-items/edit/") ? (
            <DeleteButton
              label=" Delete"
              onDelete={() => handleDeleteItem(id)}
            ></DeleteButton>
          ) : (
            <></>
          )}
        </div>
      </div>
    </form>
  );
}
