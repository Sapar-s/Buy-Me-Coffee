import { runQuery } from "@/util/queryService";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const { country, firstName, lastName, cardNumber, expires, year, userId } =
      await req.json();

    const expiryDate = `${year}-${expires}-01`;

    const createBankCard = `INSERT INTO "BankCard" (country, firstname, lastname, cardnumber, expirydate, userid) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
    const newBankCard = (await runQuery(createBankCard, [
      country,
      firstName,
      lastName,
      cardNumber,
      expiryDate,
      userId,
    ])) as { id: number }[];

    if (!newBankCard) {
      return new NextResponse(
        JSON.stringify({
          bankCard: newBankCard,
          message: "Failed to created newBankCard",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const bankCardId = newBankCard[0].id;

    const updateUser = `UPDATE "Users" SET BankCard = $1 WHERE id = $2`;

    await runQuery(updateUser, [bankCardId, userId]);

    return new NextResponse(
      JSON.stringify({
        bankCard: newBankCard,
        message: "Successfully connected bank card",
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
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

    const getBankCardData = `SELECT * FROM "BankCard" WHERE userid = $1 `;
    const bankCard = await runQuery(getBankCardData, [userId]);

    return new NextResponse(
      JSON.stringify({
        bankCard: bankCard,
        message: "Successfully get bank card",
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
