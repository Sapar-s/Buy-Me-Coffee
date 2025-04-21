import { runQuery } from "@/util/queryService";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request): Promise<Response> {
  try {
    const { username, email, password } = await req.json();
    const usernameQuery = `SELECT username FROM "Users" WHERE username=$1`;

    const isfoundUser = await runQuery(usernameQuery, [username]);

    if (isfoundUser.length > 0)
      return new NextResponse(
        JSON.stringify({ error: "username burtgeltei hereglegch baina!" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );

    const emailQuery = `select username from "Users" where email = $1`;
    const isfoundEmail = await runQuery(emailQuery, [email]);

    if (isfoundEmail.length > 0)
      return new NextResponse(
        JSON.stringify({ error: "email burtgeltei hereglegch baina!" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = `INSERT INTO "Users" (username, email, password) VALUES ($1, $2, $3)`;

    const newUser = await runQuery(createUser, [
      username,
      email,
      hashedPassword,
    ]);

    return new NextResponse(
      JSON.stringify({ user: newUser, message: "Амжилттай бүртгэгдлээ" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Aldaa garlaa:", error);
    return new NextResponse(
      JSON.stringify({ error: "Serveriin aldaa garlaa!" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
