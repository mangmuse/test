import { NextApiRequest, NextApiResponse } from "next";
// import { watchCalendar } from "../../../utils/googleCalendar";
import { createClient } from "@/utils/supabase/server";
import { watchCalendar } from "@/utils/googleCalendar";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { calendarId } = req.body;

    const supabase = createClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const accessToken = session.provider_token;
    if (!accessToken) throw new Error();
    try {
      const watchResponse = await watchCalendar(accessToken, calendarId);
      res.status(200).json(watchResponse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to setup webhook" });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
