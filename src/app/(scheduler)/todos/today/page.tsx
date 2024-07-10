"use client";
import Page from "@/components/Page";
import { getCalendars, watchCalendar } from "@/utils/googleCalendar";
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect } from "react";

const TodayTodosPage = () => {
  useEffect(() => {
    (async () => {
      // const supabase = createClient();
      // const accessToken = (await supabase.auth.getSession()).data.session
      //   ?.provider_token;
      // if (!accessToken) throw new Error();
      // const calendars = await getCalendars(accessToken);
      // await watchCalendar(
      //   accessToken,
      //   "b3ab1ef4dca6131054542def12412843e857728ce2189aa22588927ef327ba86@group.calendar.google.com"
      // );
      // if (!calendars) throw new Error();
      // await Promise.all(
      //   calendars.map((calendar: any) =>
      //     watchCalendar(accessToken, calendar.id)
      //   )
      // );
    })();
  }, []);

  return <Page title="투두 페이지">todo page</Page>;
};

export default TodayTodosPage;
