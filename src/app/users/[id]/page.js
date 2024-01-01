"use client";
import UserTabs from "../../components/layout/UserTabs";
import { useCheckAdmin } from "../../components/CheckAdmin";
import UserForm from "../../components/layout/UserForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function EditUsersPage() {
  const { data, loading } = useCheckAdmin();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/profile?_id=" + id)
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
      });
  }, []);

  async function handleUpdateButtonClick(ev, data) {
    ev.preventDefault();
    const updatingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    toast.promise(updatingPromise, {
      loading: "Updating... ⌛",
      success: "Profile Updated 👏 ",
      error: "Error 😔",
    });
  }

  if (loading) {
    return "Loading user info...";
  }
  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section classname="mt-8 mx-auto">
      <UserTabs isAdmin={data.admin}></UserTabs>
      <div className="max-w-lg mx-auto mt-4">
        <UserForm user={user} onSave={handleUpdateButtonClick}></UserForm>
      </div>
    </section>
  );
}
