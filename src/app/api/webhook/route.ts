import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const supabase = createClient();

//   console.log("Webhook POST request received");

//   const body = await req.text();

//   console.log("Webhook data:", body);

//   const { data, error } = await supabase
//     .from("webhook_logs")
//     .insert([{ request_body: body }]);

//   if (error) {
//     console.error("Error saving log to Supabase:", error);
//     return NextResponse.json({ error: "Failed to save log" }, { status: 500 });
//   }

//   return NextResponse.json({ message: "POST response", data });
// }
export async function POST() {
  return NextResponse.json("포스트");
}
