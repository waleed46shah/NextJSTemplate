// app/api/auth.ts
import jwt from "jsonwebtoken";
import { User, getUserByUsername, addUser } from "./dummyData";

const SECRET_KEY = "your-secret-key";

export const authenticate = (
  username: string,
  password: string
): string | null => {
  const user = getUserByUsername(username);

  if (!user || user.password !== password) {
    return null;
  }

  const token = jwt.sign(
    { username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
  return token;
};

export const register = (
  username: string,
  password: string,
  role: "admin" | "user"
): string | null => {
  const existingUser = getUserByUsername(username);

  if (existingUser) {
    return null;
  }

  const newUser: User = { username, password, role };
  addUser(newUser);

  const token = jwt.sign(
    { username: newUser.username, role: newUser.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
  return token;
};

export const verifyToken = (
  token: string
): { username: string; role: "admin" | "user" } | null => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as {
      username: string;
      role: "admin" | "user";
    };
    return decoded;
  } catch (err) {
    return null;
  }
};
