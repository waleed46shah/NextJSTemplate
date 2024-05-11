import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = "user";
    const hashedPassword = await hash(password, 10);

    const response = await sql`
    INSERT INTO users (email, password, role)
    VALUES (${email}, ${hashedPassword}, ${user})
    `;
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "Success" });
}
