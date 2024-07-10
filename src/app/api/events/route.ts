import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getCalendarEvents } from "@/utils/googleCalendar";

export const GET = async (req: NextRequest) => {
  try {
    const supabase = createClient();

    // Supabase 세션에서 사용자 액세스 토큰 가져오기
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

    if (!calendarId) {
      return NextResponse.json(
        { error: "Calendar ID is required" },
        { status: 400 }
      );
    }
    // Google Calendar API를 사용하여 이벤트 정보를 가져옴

    const events = await getCalendarEvents(accessToken, calendarId);
    console.log(
      events,
      "이게이벤트지이게이벤트지이게이벤트지이게이벤트지이게이벤트지이게이벤트지"
    );

    console.log(
      "이거는나오는거지?이거는나오는거지?이거는나오는거지?이거는나오는거지?이거는나오는거지?이거는나오는거지?이거는나오는거지?"
    );
    return NextResponse.json(events);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
