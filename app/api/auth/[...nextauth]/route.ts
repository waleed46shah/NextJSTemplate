import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const response = await sql`
        SELECT * FROM users WHERE email=${credentials?.email}`;
        const user = response.rows[0];

        const passwordCorrect = await compare(
          credentials?.password || "",
          user.password
        );

        if (passwordCorrect) {
          // Check if the user's role is "admin"
          if (user.role === "admin") {
            return {
              id: user.id,
              email: user.email,
              role: user.role,
            };
          } else {
            // If the user's role is not "admin", return null to deny access
            return null;
          }
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
