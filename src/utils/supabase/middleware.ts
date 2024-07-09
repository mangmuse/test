import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    if (!user) {
      url.pathname = "/log-in";
      return NextResponse.redirect(url);
    } else {
      url.pathname = "/todos/today";
      return NextResponse.redirect(url);
    }
  }

  if (!user && !request.nextUrl.pathname.startsWith("/log-in")) {
    const url = request.nextUrl.clone();
    url.pathname = "/log-in";
    return NextResponse.redirect(url);
  }
  if (user && request.nextUrl.pathname.startsWith("/log-in")) {
    const url = request.nextUrl.clone();
    url.pathname = "/todos/today";
    console.log(url);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
