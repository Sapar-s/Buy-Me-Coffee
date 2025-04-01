import { Client } from "pg";
import { getClient } from "./db";

export async function runQuery<T>(
  query: string,
  params: any[] = []
): Promise<T[]> {
  const client: Client = getClient();
  try {
    await client.connect();
    const res = await client.query(query, params);
    return res.rows;
  } catch (error) {
    console.log("error executing query:", error);
    throw error;
  } finally {
    await client.end();
  }
}
