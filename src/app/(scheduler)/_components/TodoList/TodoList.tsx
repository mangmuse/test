"use client";

import { useEffect } from "react";

const TodoList = () => {
  useEffect(() => {
    const calendars = await getCalendars(accessToken);
    if (!calendars) throw new Error();
    await Promise.all(
      calendars.map((calendar: any) => watchCalendar(accessToken, calendar.id))
    );
  }, []);
  return <section className=" bg-slate-500">TodoList</section>;
};

export default TodoList;
