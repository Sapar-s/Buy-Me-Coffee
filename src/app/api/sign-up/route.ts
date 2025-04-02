import { runQuery } from "@/util/queryService";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    //     const createTable = `CREATE TABLE "public"."User" (
    //     "id" SERIAL PRIMARY KEY,
    //     "email" VARCHAR(255) UNIQUE NOT NULL,
    //     "password" TEXT NOT NULL,
    //     "username" VARCHAR(100) UNIQUE NOT NULL,
    //     "receivedDonations" INTEGER[],
    //     "createdAt" TIMESTAMP DEFAULT NOW(),
    //     "updatedAt" TIMESTAMP DEFAULT NOW()
    // );`;

    // const users = await runQuery(createTable);

    const { username, email, password } = await req.json();

    // const users = await runQuery(createTable);
    // const chechUserQuery = ``;
  } catch (error) {
    console.error("Aldaa garlaa:", error);
    return new NextResponse(
      JSON.stringify({ error: "Serveriin aldaa garlaa!" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// export async function GET(): Promise<NextResponse> {
//   try {
//     const incomingName = "boldo";
//     // const createTable = `CREATE TABLE "public"."Food" ("id" integer PRIMARY KEY,"name" varchar NOT NULL,"price" integer);`;
//     const getUser = `SELECT name,password FROM "User" WHERE name='${incomingName}' AND password='1235';`;

//     const user = await runQuery(getUser);
//     if (user.length <= 0) {
//       return new NextResponse(JSON.stringify({ error: "user not found" }), {
//         status: 404,
//       });
//     }

//     return new NextResponse(JSON.stringify({ foods: user }));
//   } catch (err) {
//     console.error("Failed to run query:", err);
//     return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
//       status: 500,
//     });
//   }
// }
