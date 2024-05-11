import { useRouter } from "next/navigation";
import { useAuth as useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { isAuthenticated, user, login, logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return { isAuthenticated, user, login, logout: handleLogout };
};
