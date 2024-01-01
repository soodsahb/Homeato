"use client";
import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import { useCheckAdmin } from "../components/CheckAdmin";
import Link from "next/link";

const Users = () => {
  const { data, loading } = useCheckAdmin();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);
      });
  }, []);
  if (loading) {
    return "Loading...";
  }
  if (!data.admin) {
    return "not an admin";
  }
  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={data.admin}></UserTabs>
      <div className="mt-8">
        {users.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg p-4 mb-2 flex justify-between items-center"
            >
              <div className="grid grid-cols-2 gap-4 grow md:grid-cols-3">
                <div>
                  {user.userName && <span>{user.userName}</span>}
                  {!user.userName && <span className="italic">No name</span>}
                </div>

                <span className="overflow-hidden">{user.email}</span>
              </div>
              <div>
                <Link className="button" href={"/users/" + user._id}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Users;
