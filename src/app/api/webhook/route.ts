import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();

  console.log("Webhook POST request received");

  const body = await req.text(); // Google은 웹훅 데이터를 텍스트 형식으로 보냅니다.

  console.log("Webhook data:", body);

  const { data, error } = await supabase
    .from("webhook_logs")
    .insert([{ request_body: body }]);

  if (error) {
    console.error("Error saving log to Supabase:", error);
    return NextResponse.json({ error: "Failed to save log" }, { status: 500 });
  }

  return NextResponse.json({ message: "POST response", data });
}
