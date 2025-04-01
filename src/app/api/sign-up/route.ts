import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const { username, email, password } = await req.json();

    const chechUserQuery = ``;
  } catch (error) {
    console.error("Aldaa garlaa:", error);
    return new NextResponse(
      JSON.stringify({ error: "Serveriin aldaa garlaa!" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
