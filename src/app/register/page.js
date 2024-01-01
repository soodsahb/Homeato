"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useRef } from "react";
import { MdError } from "react-icons/md";
import { signIn } from "next-auth/react";

const Registerpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [err, setErr] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSignInWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  //mai ethe do states rkh reha aa creating user na mai ohni der input disable rkhni aa jini der create ho reha user

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setErr(false);
    setUserCreated(false);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password, userName }),
        headers: { "Content-Type": "application/json" },
      });
      console.log(userName);

      if (response.ok) {
        setUserCreated(true);
      } else {
        setErr(true);
        console.error(`Registration failed with status: ${response.status}`);
      }
    } catch (error) {
      setErr(true);
      console.error("Error during registration:", error);
    }

    setCreatingUser(false);
  }
  return (
    <section>
      <h1 className="text-center text-primary text-4xl  mt-8 mb-4">Register</h1>
      {userCreated && (
        <div className="py-2 flex  bg-green-300 justify-center gap-2 items-center max-w rounded-xl my-4">
          Registration Successful
          <FaThumbsUp />
          <Link className="flex items-center gap-1 underline" href={"/login"}>
            Login <FaExternalLinkAlt />{" "}
          </Link>
        </div>
      )}
      {err && (
        <div className="py-2 flex  bg-red-500 justify-center gap-2 items-center max-w rounded-xl my-4">
          Error Occured
          <MdError />
        </div>
      )}
      <form className=" max-w-xs m-auto block" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={creatingUser}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={creatingUser}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          Or Login With Provider
        </div>
      </form>
      <button
        onClick={handleSignInWithGoogle}
        className="flex items-center gap-4 justify-center rounded-full hover:bg-emerald-300 max-w-xs mx-auto"
      >
        <FcGoogle className="text-4xl" />
        Login With Google
      </button>
      <button className="mt-4 text-gray-500 hover:bg-purple-200 rounded-full font-semibold max-w-xs mx-auto">
        Existing account?{" "}
        <Link className="underline" href={"/login"}>
          Login Here
        </Link>
      </button>
    </section>
  );
};

export default Registerpage;
