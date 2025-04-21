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
    const data = await req.json();
    const { id, name, about, avatarImage, socialMediaURL } = data;

    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "id zaaval heregtei" }),
        {
          status: 400,
        }
      );
    }

    const fields = [];
    const values = [];
    let index = 1;

    if (name !== undefined) {
      fields.push(`"name" = $${index++}`);
      values.push(name);
    }
    if (about !== undefined) {
      fields.push(`"about" = $${index++}`);
      values.push(about);
    }
    if (avatarImage !== undefined) {
      fields.push(`"avatarimage" = $${index++}`);
      values.push(avatarImage);
    }
    if (socialMediaURL !== undefined) {
      fields.push(`"socialmediaurl" = $${index++}`);
      values.push(socialMediaURL);
    }

    if (fields.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "shinechleh zuil oldsongui" }),
        {
          status: 400,
        }
      );
    }

    values.push(id); // for WHERE clause
    const updateQuery = `
      UPDATE "Profile"
      SET ${fields.join(", ")}
      WHERE userid = $${index}
      RETURNING *;
    `;

    const updatedProfile = await runQuery(updateQuery, values);

    return new NextResponse(
      JSON.stringify({ message: "amjilttai soligdloo", updatedProfile }),
      { status: 200 }
    );
  } catch (err) {
    console.error("🔥 Error in PUT /api/complete-profile:", err);
    return new NextResponse(
      JSON.stringify({ message: "server aldaa garlaa", err }),
      {
        status: 500,
      }
    );
  }
}
