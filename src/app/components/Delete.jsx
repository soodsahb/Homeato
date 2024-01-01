import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {
  const [confirm, setconfirm] = useState(false);
  if (confirm) {
    return (
      <div className="flex fixed bg-black/80 inset-0 items-center justify-center">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-center mt-1">Are you sure?</h2>
          <div className="flex gap-2 mt-2 ">
            <button
              type="button "
              className="flex items-center rounded-full"
              onClick={() => setconfirm(false)}
            >
              Cancel
            </button>
            <button
              className="border-primary bg-primary text-white rounded-full"
              type="button"
              onClick={() => {
                onDelete();
                setconfirm(false);
              }}
            >
              Yes Delete!
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <button type="button" className="mt-2" onClick={() => setconfirm(true)}>
        {label}
      </button>
    </>
  );
}
