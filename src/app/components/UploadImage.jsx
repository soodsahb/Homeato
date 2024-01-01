import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa";
import Image from "next/image";

export default function UploadImage({ link, setLink }) {
  const showToast = () => {
    const message = (
      <div className="flex">
        Uploading... {"  "}
        <FaUpload />
      </div>
    );

    toast(message);
  };

  async function handleFileChange(ev) {
    const files = ev.target.files;

    if (files?.length === 1) {
      const data = new FormData();
      data.set("files", files[0]);
      // setIsUploading(true);
      showToast();
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const link = await response.json();
      setLink(link);
      // setIsUploading(false);
      toast.success("Upload Complete!");
    }
  }

  return (
    <>
      {link && (
        <Image
          className=" rounded-full  mb-2"
          src={link}
          height={"100"}
          width={"100"}
          alt="image"
        ></Image>
      )}
      {!link && (
        <div className="bg-gray-200 p-4 text-gray-500 rounded-full mb-1 text-center">
          No image
        </div>
      )}

      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block text-center border border-gray-300 cursor-pointer p-2 rounded-full">
          Edit Image
        </span>
      </label>
    </>
  );
}
