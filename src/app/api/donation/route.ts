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
    const donationId = newDonation[0].id;

    const updateUser = `UPDATE "Users" SET receivedDonations = $1 WHERE id = $2`;
    await runQuery(updateUser, [donorId, profileId]);

    return new NextResponse(
      JSON.stringify({
        bankCard: newDonation,
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
