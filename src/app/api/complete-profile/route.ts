import { runQuery } from "@/util/queryService";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const { avatarimage, name, about, socialmediaurl, userId } =
      await req.json();

    const createProfile = `INSERT INTO "Profile" (avatarimage,name,about,socialmediaurl,userid) VALUES($1, $2, $3, $4, $5) RETURNING *`;

    const newProfile = (await runQuery(createProfile, [
      avatarimage,
      name,
      about,
      socialmediaurl,
      userId,
    ])) as { id: number }[]; // Explicitly typing the result

    if (!newProfile) {
      return new NextResponse(
        JSON.stringify({
          profile: newProfile,
          message: "Failed to created profile",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const profileId = (newProfile[0] as { id: number }).id; // Ensuring type safety

    const updateUser = `UPDATE "User" SET Profile = $1 WHERE id = $2`;

    await runQuery(updateUser, [profileId, userId]);

    return new NextResponse(
      JSON.stringify({
        profile: newProfile,
        message: "Successfully created profile",
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Aldaa garlaa:", error);
    return new NextResponse(
      JSON.stringify({ error: "Complete profile dotor aldaa garlaa!" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
