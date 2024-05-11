import React from "react";
import { useAuth } from "@/app/context/AuthContext";

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  return (
    <div>
      <h1>Login</h1>
      <button onClick={login}>Sign in with GitHub</button>
    </div>
  );
};

export default LoginPage;
