"use client";

import { useRouter } from "next/navigation";

export default function DeniedPage() {
  const router = useRouter();

  const handleLogout = () => {
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
