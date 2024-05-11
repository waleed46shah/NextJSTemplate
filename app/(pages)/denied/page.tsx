"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function DeniedPage() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div>
      <h1>Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
