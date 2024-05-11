// api/dummyData.ts

export interface User {
  username: string;
  password: string;
  role: "admin" | "user";
}

const defaultAdmin: User = {
  username: "admin",
  password: "1234",
  role: "admin",
};

const users: User[] = [defaultAdmin];

export const getUserByUsername = (username: string): User | undefined => {
  return users.find((user) => user.username === username);
};

export const addUser = (user: User) => {
  users.push(user);
};
