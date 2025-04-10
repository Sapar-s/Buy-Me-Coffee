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

    const updateUser = `UPDATE "Users" SET Profile = $1 WHERE id = $2`;

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

export async function PUT(req: Request): Promise<Response> {
  try {
    const { name, about, avatarImage, socialMediaURL, id } = await req.json();

    const changeProfile = `
    UPDATE "Profile" 
    SET "name" = $1, "about" = $2, "avatarImage" = $3, "socialMediaURL" = $4 
    WHERE "id" = $5 
    RETURNING *;
  `;

    const updatedProfile = await runQuery(changeProfile, [
      name,
      about,
      avatarImage,
      socialMediaURL,
      id,
    ]);
    if (updatedProfile.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "profile oldsongui" }),
        { status: 404 }
      );
    }
    return new NextResponse(
      JSON.stringify({ message: "amjilttai soligdloo", updatedProfile }),
      { status: 201 }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "server aldaa garlaa", err }),
      {
        status: 500,
      }
    );
  }
}

// export async function PUT(req: Request): Promise<Response> {
//   try {
//     const { avatarimage, name, about, socialmediaurl, userId } =
//       await req.json();

//     // Profile-г шинэчлэх SQL
//     const updateProfile = `
//       UPDATE "Profile"
//       SET avatarimage = $1, name = $2, about = $3, socialmediaurl = $4
//       WHERE userid = $5
//       RETURNING *;
//     `;

//     const updatedProfile = (await runQuery(updateProfile, [
//       avatarimage,
//       name,
//       about,
//       socialmediaurl,
//       userId,
//     ])) as { id: number }[];

//     if (!updatedProfile || updatedProfile.length === 0) {
//       return new NextResponse(
//         JSON.stringify({ message: "Шинэчлэхэд алдаа гарлаа!" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     return new NextResponse(
//       JSON.stringify({
//         profile: updatedProfile,
//         message: "Профайл амжилттай шинэчлэгдлээ!",
//       }),
//       { status: 200, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (error) {
//     console.error("PUT method error:", error);
//     return new NextResponse(
//       JSON.stringify({ error: "Профайл шинэчлэх үед алдаа гарлаа!!!" }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }
