import { runQuery } from "@/util/queryService";
import { checkUser } from "../../../../back_end/controllers/user.controller";
import { getUsers } from "../../../../back_end/users";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    //     const createTable = `
    // CREATE TABLE "public"."User" (
    //   "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    //   "name" varchar NOT NULL,
    //   "column_3" text
    // )`;

    const getUser = `SELECT name, FROM "User"`;
    const users = await runQuery<{ id: number; name: string }>(createTable);

    return new NextResponse(JSON.stringify({ users: users }));
  } catch (error) {
    console.log("Failed to run query:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }
}

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  console.log({ body });
  return await checkUser({ email: body.email, password: body.password });
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
