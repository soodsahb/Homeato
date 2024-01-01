"use client";
import React from "react";
import Image from "next/image";
import InfoBox from "../layout/InfoBox";
import Link from "next/link";
import UploadImage from "../UploadImage";
import { useState } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { useCheckAdmin } from "../CheckAdmin";
import AddressInputs from "./AddressInputs";

const UserForm = ({ user, onSave }) => {
  const [image, setImage] = useState(user?.image || "");
  const [userName, setUsername] = useState(user?.userName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [pincode, setPincode] = useState(user?.pincode);
  const [country, setCountry] = useState(user?.country || "");
  const [city, setCity] = useState(user?.city);
  const [email, setEmail] = useState(user?.email || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const path = usePathname();
  const { data } = useCheckAdmin();
  const { id } = useParams;

  useEffect(() => {
    setImage(user?.image || "");
    setUsername(user?.userName || "");
    setPhone(user?.phone || "");
    setAddress(user?.address || "");
    setPincode(user?.pincode || "");
    setCountry(user?.country || "");
    setCity(user?.city || "");
    setEmail(user?.email || "");
    setAdmin(user?.admin || "");
  }, [user]);
  // path === "/profile"
  //   ? useEffect(() => {
  //       // Fetch user data from the database (replace with your actual API endpoint)
  //       fetch("/api/profile") // Update the API endpoint as needed
  //         .then((res) => res.json())
  //         .then((userData) => {
  //           // Update state variables with user data
  //           setImage(userData?.image || "");
  //           setUsername(userData?.userName || "");
  //           setPhone(userData?.phone || "");
  //           setAddress(userData?.address || "");
  //           setPincode(userData?.pincode || "");
  //           setCountry(userData?.country || "");
  //           setCity(userData?.city || "");
  //           setEmail(userData?.email || "");
  //           setAdmin(userData?.admin || "");
  //         })
  //         .catch((error) => console.error("Error fetching user data:", error));
  //     }, [])
  //   : {};

  // path.includes("/users")
  //   ? useEffect(() => {
  //       // Fetch user data from the database (replace with your actual API endpoint)
  //       fetch("/api/profile_id=" + id)
  //         .then((res) => res.json())
  //         .then((userData) => {
  //           // Update state variables with user data
  //           setImage(userData?.image || "");
  //           setUsername(userData?.userName || "");
  //           setPhone(userData?.phone || "");
  //           setAddress(userData?.address || "");
  //           setPincode(userData?.pincode || "");
  //           setCountry(userData?.country || "");
  //           setCity(userData?.city || "");
  //           setEmail(userData?.email || "");
  //         })
  //         .catch((error) => console.error("Error fetching user data:", error));
  //     }, [])
  //   : {};
  console.log(user);
  return (
    <div className="md:flex gap-4 ">
      <div className=" rounded-full p-2 relative">
        <UploadImage link={image} setLink={setImage}></UploadImage>
      </div>
      <form
        className="grow items-center "
        onSubmit={(ev) =>
          onSave(ev, {
            userName,
            image,
            phone,
            address,
            pincode,
            country,
            city,
            admin,
          })
        }
      >
        <label>First and last name</label>
        <input
          type="text"
          placeholder="Full name "
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input type="email" value={email} disabled />
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
        {data?.admin && (
          <label
            htmlFor="admincb"
            className="p-2 inline-flex items-center gap-2 mb-1"
          >
            <input
              id="admincb"
              type="checkbox"
              className=""
              value={"1"}
              checked={admin}
              onChange={(ev) => setAdmin(ev.target.checked)}
            />
            <span>Admin</span>
          </label>
        )}

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserForm;
