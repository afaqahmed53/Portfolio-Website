import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ aiAvailable: !!process.env.OPENAI_API_KEY });
}
