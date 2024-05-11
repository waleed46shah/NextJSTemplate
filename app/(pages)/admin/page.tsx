"use client";
import React from "react";
import { useAuth } from "@/app/context/AuthContext";

const page = () => {
  const { user } = useAuth();

  return;
  <div>
    <h1>Admin Panel</h1>
    <p>Welcome, {user?.username}!</p>
    {/* Add your admin panel functionality here */}
  </div>;
};

export default page;
