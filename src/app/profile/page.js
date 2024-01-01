"use client";
import NextAuth from "next-auth";
import React from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { redirect } from "next/navigation";

import { useEffect } from "react";

import toast from "react-hot-toast";

import UserTabs from "../components/layout/UserTabs";
import { useCheckAdmin } from "../components/CheckAdmin";

import UserForm from "../components/layout/UserForm";

const Page = () => {
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;
  const [user, setUser] = useState(null);

  const { loading: profileLoading } = useCheckAdmin();

  const [isAdmin, setIsAdmin] = useState(false);

  // const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((res) => {
        res.json().then((data) => {
          setUser(data), setIsAdmin(data.admin);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();
    console.log(data);
    // setIsSaving(true);

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) resolve();
      else reject();
    });

    toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile Saved! ",
      error: "Error",
    });

    // setIsSaving(false);
  }

  if (profileLoading) {
    return "Loading Profile Info...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section>
      <UserTabs isAdmin={isAdmin}></UserTabs>

      <div className=" max-w-sm mx-auto mt-4">
        <UserForm user={user} onSave={handleProfileInfoUpdate}></UserForm>
      </div>
    </section>
  );
};

export default Page;
