"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { useEffect } from "react";
const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    // If the user is authenticated, redirect them away from the login page
    if (status === "authenticated" && status !== "loading") {
      redirect("/"); // Replace with the path you want to redirect to
    }
  }, [session, status]);

  if (status === "authenticated" || status === "loading") {
    return null; // or you can show a loading spinner or any other UI
  }

  const handleSignInWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn("credentials", { email, password, callbackUrl: "/" });

    setLoginInProgress(false);
  }

  return (
    <section>
      <h1 className="text-center text-primary text-4xl  mt-8 mb-4">Login</h1>

      <form className=" max-w-xs m-auto block" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          disabled={loginInProgress}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          disabled={loginInProgress}
        />

        <button type="submit" disabled={loginInProgress}>
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          Or Login With Provider
        </div>
        <button
          type="button"
          onClick={handleSignInWithGoogle}
          className="flex items-center gap-4 justify-center rounded-full hover:bg-emerald-300"
        >
          <FcGoogle className="text-4xl" />
          Login With Google
        </button>
      </form>
    </section>
  );
};

export default Loginpage;
