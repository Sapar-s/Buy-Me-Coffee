import { runQuery } from "@/util/queryService";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const { imageURL, userId } = await req.json();

    const addImageQuery = `  UPDATE "Profile" SET backgroundimage = $1 WHERE userid = $2 RETURNING *;`;

    const newBackgroundImage = await runQuery(addImageQuery, [
      imageURL,
      userId,
    ]);

    console.log("newBackgroundImage", newBackgroundImage);

    return new NextResponse(
      JSON.stringify({
        backgroundImage: newBackgroundImage,
        message: "Successfully add background image",
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const getImageQuery = `SELECT backgroundimage FROM "Profile" WHERE userid = $1; `;

    const getImageData = await runQuery(getImageQuery, [userId]);

    console.log("getImageData", getImageData);

    return new NextResponse(
      JSON.stringify({
        backgroundImage: getImageData,
        message: "Successfully getting background image",
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
