import { runQuery } from "@/util/queryService";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const { successMessage, userId } = await req.json();

    const successMessageQuery = `UPDATE "Profile" set successmessage = $1 WHERE userid = $2  `;

    const newSuccessMessage = await runQuery(successMessageQuery, [
      successMessage,
      userId,
    ]);

    return new NextResponse(
      JSON.stringify({
        successMessage: newSuccessMessage,
        message: "Successfully created success message",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Aldaa garlaa:", error);
    return new NextResponse(
      JSON.stringify({ error: "Complete success message dotor aldaa garlaa!" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId || isNaN(Number(userId))) {
      return new NextResponse(JSON.stringify({ error: "Invalid userId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const getSuccessMessageQuery = `SELECT successmessage FROM "Profile" WHERE userid = $1`;

    const getSuccessMessage = await runQuery(getSuccessMessageQuery, [userId]);

    return new NextResponse(
      JSON.stringify({
        successMessage: getSuccessMessage,
        message: "Successfully fetched success message",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Aldaa garlaa:", error);
    return new NextResponse(
      JSON.stringify({ error: "Complete get message dotor aldaa garlaa!" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
