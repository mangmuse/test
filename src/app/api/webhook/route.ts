import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("webhook get");
  return NextResponse.json({ message: "GET response" });
}

export async function POST(req: NextRequest) {
  console.log("webhook post");

  return NextResponse.json({ message: "POST response" });
}
