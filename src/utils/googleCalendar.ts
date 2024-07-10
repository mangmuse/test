import { google } from "googleapis";

export const getOAuth2Client = (accessToken: string) => {
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    "https://tlowtwszdmfkupiamqsb.supabase.co/auth/v1/callback"
  );
  oauth2Client.setCredentials({
    access_token: accessToken,
    scope: "https://www.googleapis.com/auth/calendar.readonly",
  });
  return oauth2Client;
};

export const getCalendars = async (accessToken: string) => {
  const oauth2Client = getOAuth2Client(accessToken);

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const response = await calendar.calendarList.list();

  return response.data.items;
};

export const getCalendarEvents = async (
  accessToken: string,
  calendarId: string
) => {
  const oauth2Client = getOAuth2Client(accessToken);

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const response = await calendar.events.list({
    calendarId: calendarId,
    maxResults: 10,
  });

  return response.data.items;
};

export const watchCalendar = async (
  accessToken: string,
  calendarId: string
) => {
  const oauth2Client = getOAuth2Client(accessToken);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const id = crypto.randomUUID();
  const response = await calendar.events.watch({
    calendarId: calendarId,
    requestBody: {
      id,
      type: "web_hook",
      address: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook`,
    },
  });
  return response.data;
};
