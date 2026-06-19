import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    plaidEnabled: Boolean(process.env.PLAID_CLIENT_ID && process.env.PLAID_SECRET),
    quickBooksEnabled: Boolean(
      process.env.QUICKBOOKS_CLIENT_ID && process.env.QUICKBOOKS_CLIENT_SECRET,
    ),
  });
}
