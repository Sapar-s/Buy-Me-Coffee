import { runQuery } from "@/util/queryService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const getAllUser = `SELECT "Users"."id","Users"."email","Users"."username" FROM "Users";`;
    const users = await runQuery(getAllUser);
    return new NextResponse(JSON.stringify({ message: "amjilttai", users }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "aldaa garlaa" }), {
      status: 500,
    });
  }
}
