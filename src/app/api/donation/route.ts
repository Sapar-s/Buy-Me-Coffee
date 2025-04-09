import { runQuery } from "@/util/queryService";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const { amount, socialURLOrBuyMeACoffee, message, profileId, donorId } =
      await req.json();

    const integerAmount =
      amount === "one"
        ? 1
        : amount === "two"
        ? 2
        : amount === "five"
        ? 5
        : amount === "ten"
        ? 10
        : 0;

    const giveDonation = `INSERT INTO "Donation" (amount, socialURLOrBuyMeACoffee, specialmessage, donorId, recipientId) VALUES($1, $2, $3, $4, $5) RETURNING *`;

    const newDonation = (await runQuery(giveDonation, [
      integerAmount,
      socialURLOrBuyMeACoffee,
      message,
      donorId,
      profileId,
    ])) as { id: number }[];

    console.log("newDonation", newDonation);

    if (!newDonation) {
      return new NextResponse(
        JSON.stringify({
          donation: newDonation,
          message: "Failed to created newDonation",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updateUser = `UPDATE "Users" SET "receivedDonations" = array_append("receivedDonations", $1 )WHERE id = $2 `;
    await runQuery(updateUser, [donorId, profileId]);

    return new NextResponse(
      JSON.stringify({
        donation: newDonation,
        message: "Successfully given donation",
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

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const getAllDonations = `SELECT * FROM "Donation" INNER JOIN "Profile" ON "Donation"."donorid" = "Profile"."userid" WHERE "Donation".recipientid = $1;`;
    const donations = await runQuery(getAllDonations, [userId]);

    // if (!Array.isArray(donations) || donations.length === 0) {
    //   return new NextResponse(
    //     JSON.stringify({ message: "No donations found" }),
    //     {
    //       status: 404,
    //     }
    //   );
    // }

    return new NextResponse(JSON.stringify(donations), {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
