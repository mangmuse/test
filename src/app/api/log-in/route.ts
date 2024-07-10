import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const scopes = [
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar",
  ];
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/api/log-in/callback",
      scopes: "https://www.googleapis.com/auth/calendar",
    },
  });

  if (error) {
    console.error("signInWithOAuth 에러:::::", error);
    return NextResponse.json({ error: error.message });
  }

  if (data.url) {
    return NextResponse.redirect(data.url);
  }
  return NextResponse.json(data);
}
