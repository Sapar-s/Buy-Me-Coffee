import { NextResponse } from "next/server";

export async function GET() {
  try {
  } catch (error) {
    console.log("error", error);
    return new Response(
      JSON.stringify({ error: true, message: "error in getting user" }),
      { status: 500 }
    );
  }
}
