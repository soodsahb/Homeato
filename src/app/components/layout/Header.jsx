"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../AppContext";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { usePathname } from "next/navigation";
const Header = () => {
  const session = useSession();

  const status = session.status;
  const userData = session.data?.user;
  const path = usePathname();

  const [image, setImage] = useState("");
  const [username, setUserName] = useState("Profile");
  const { cartProducts } = useContext(CartContext);
  const [handleHamToggle, setHandleHamToggle] = useState(false);

  useEffect(() => {
    // Update your state to false whenever the pathname changes
    setHandleHamToggle(false);
  }, [path]); // Dependency on pathname

  function AuthLinks({ status, image, handleSignOut, username }) {
    if (status === "authenticated") {
      return (
        <>
          {image ? (
            <Image
              src={image}
              width={40}
              height={40}
              alt="image"
              className="rounded-full"
            />
          ) : (
            <div className="placeholder"></div>
          )}
          <Link className="-ml-2 hover:text-primary" href={"/profile"}>
            {username}
          </Link>
          <button
            className="bg-primary px-8 py-2 text-white rounded-full"
            onClick={handleSignOut}
          >
            Logout
          </button>

          <Link href="/cart" className="relative md:flex items-center hidden">
            <FaShoppingCart className="text-2xl" />
            {cartProducts.length > 0 && (
              <span className="absolute -top-3.5 -right-3 bg-primary text-white rounded-full text-xs px-1 py-0.5  mb-1 animate-bounce">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </>
      );
    }

    if (status === "unauthenticated") {
      return (
        <>
          <Link href={"/login"}>Login</Link>
          <Link
            href={"/register"}
            className="bg-primary px-8 py-2 text-white rounded-full"
          >
            Register
          </Link>
        </>
      );
    }
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  function headerphoto() {
    if (status === "authenticated") {
      fetch("/api/profile").then((res) => {
        res.json().then((data) => {
          if (data?.image) {
            setImage(data.image);
          }
          if (data.userName) {
            setUserName(data?.userName);
          }
        });
      });
    }
  }

  useEffect(() => {
    headerphoto();
  }, [session, status]);

  function handleMenu() {
    setHandleHamToggle((prev) => !prev);
  }
  return (
    <header className="">
      <div className="flex md:hidden justify-between items-center">
        <Link className="text-primary font-semibold text-2xl" href={"/"}>
          HOMEATO
        </Link>
        <div className="flex gap-6 items-center">
          {status === "authenticated" && (
            <Link href="/cart" className="relative flex items-center">
              <FaShoppingCart className="text-2xl" />
              {cartProducts.length > 0 && (
                <span className="absolute -top-3.5 -right-3 bg-primary text-white rounded-full text-xs px-1 py-0.5  mb-1 animate-bounce">
                  {cartProducts.length}
                </span>
              )}
            </Link>
          )}

          <button onClick={handleMenu}>
            <GiHamburgerMenu />
          </button>
        </div>
      </div>

      {handleHamToggle && (
        <div className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 ">
          <div className="flex flex-col justify-cente items-center gap-2">
            {status === "authenticated" && (
              <>
                <Link className="hover:text-primary" href={"/"}>
                  Home
                </Link>
                <Link className="hover:text-primary" href={"/menu"}>
                  Menu
                </Link>
                <Link className="hover:text-primary" href={"/#about"}>
                  About
                </Link>
                <Link className="hover:text-primary" href={"/#contactus"}>
                  Contact
                </Link>
              </>
            )}

            <AuthLinks
              status={status}
              image={image}
              handleSignOut={handleSignOut}
              username={username}
            ></AuthLinks>
          </div>
        </div>
      )}

      <div className="hidden md:flex items-center justify-between">
        <nav className="flex gap-8 text-gray-400 font-semibold items-center">
          <Link className="text-primary font-semibold text-2xl" href={"/"}>
            HOMEATO
          </Link>
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contactus"}>Contact</Link>
        </nav>
        <nav className=" flex gap-4 text-gray-400 font-semibold items-center">
          <AuthLinks
            status={status}
            image={image}
            handleSignOut={handleSignOut}
            username={username}
          ></AuthLinks>
        </nav>
      </div>
    </header>
  );
};

export default Header;
