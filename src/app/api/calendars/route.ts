import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getCalendarEvents, getCalendars } from "@/utils/googleCalendar";
import { google } from "googleapis";
console.log("asd");
const getOAuth2Client = (accessToken: string) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  return oauth2Client;
};

export const watchCalendar = async (
  accessToken: string,
  calendarId: string
) => {
  const oauth2Client = getOAuth2Client(accessToken);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const channelId = `${calendarId}-${crypto.randomUUID()}`;
  console.log(
    calendarId,
    "calendarIdcalendarIdcalendarIdcalendarIdcalendarIdcalendarIdcalendarIdcalendarIdcalendarIdcalendarIdcalendarId"
  );
  const response = await calendar.events.watch({
    calendarId: calendarId,
    requestBody: {
      id: channelId,
      type: "web_hook",
      address: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook`,
    },
  });

  return response.data;
};

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
    // if (!calendars) throw new Error();
    // await Promise.all(
    //   calendars.map((calendar: any) => watchCalendar(accessToken, calendar.id))
    // );
    console.log(accessToken);
    console.log("acacacacacac");
    const dd = await watchCalendar(
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
