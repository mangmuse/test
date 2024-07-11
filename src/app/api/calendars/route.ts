import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import {
  getCalendarEvents,
  getCalendars,
  watchCalendar,
} from "@/utils/googleCalendar";
import { google } from "googleapis";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  try {
    const supabase = createClient();

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const accessToken = session.provider_token;
    const calendarId = req.nextUrl.searchParams.get("calendarId");

    if (!accessToken) {
      return NextResponse.json(
        { error: "accessToken is required" },
        { status: 400 }
      );
    }

    const calendars = await getCalendars(accessToken);

    if (!calendars) return NextResponse.json({ error: "캘린더가 없어요" });
    await Promise.all(
      calendars.map((calendar: any) => watchCalendar(accessToken, calendar.id))
    );
    await watchCalendar(
      accessToken,
      "b3ab1ef4dca6131054542def12412843e857728ce2189aa22588927ef327ba86@group.calendar.google.com"
    );

    return NextResponse.json(calendars);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
