import { runQuery } from "@/util/queryService";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { userType } from "@/util/types";

export async function POST(req: Request): Promise<Response> {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ message: "Enter your email or password" })
      );
    }

    const getUserQuery = `select * from "Users" where email = $1; `;
    const users: userType[] = await runQuery(getUserQuery, [email]);

    if (!users || users.length == 0) {
      return new NextResponse(
        JSON.stringify({ error: "Hereglegch oldsongui!" }),
        {
          status: 404,
          headers: { "Content-Type": "applicaton/json" },
        }
      );
    }

    const user = users[0];
    console.log(user);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new NextResponse(
        JSON.stringify({ error: "Password buruu baina!" }),
        {
          status: 401,
          headers: { "Content-Type": "applicaton/json" },
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Amjilttai nevterlee !", user }),
      {
        status: 200,
        headers: { "Content-Type": "applicaton/json" },
      }
    );
  } catch (error) {
    console.error("Aldaa garlaa:", error);
    return new NextResponse(
      JSON.stringify({ error: "Serveriin aldaa garlaa!" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
