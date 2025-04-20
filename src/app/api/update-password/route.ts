import { runQuery } from "@/util/queryService";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(req: Request): Promise<Response> {
  try {
    const { updatePassword, userId } = await req.json();

    if (!userId || isNaN(Number(userId))) {
      return new NextResponse(JSON.stringify({ error: "Invalid userId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashedPassword = await bcrypt.hash(updatePassword, 10);

    const updatePassQuery = `UPDATE "Users" SET password = $1 WHERE id = $2 `;

    const newPassword = await runQuery(updatePassQuery, [
      hashedPassword,
      userId,
    ]);

    return new NextResponse(
      JSON.stringify({
        password: newPassword,
        message: "Successfully updated password",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "aldaa garlaa", error }),
      {
        status: 500,
      }
    );
  }
}
